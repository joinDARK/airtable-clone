const fs = require("fs");

const BaseService = require("./baseService");
const { S3_CLIENT } = require("../config/app.config")
const { File } = require("../db/models");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const BUCKET_NAME = "airtable-clone";

const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://storage.yandexcloud.net",
  credentials: {
    accessKeyId: S3_CLIENT.S3_ACCESS_KEY || "",
    secretAccessKey: S3_CLIENT.S3_SECRET_KEY || "",
  },
});

class FileService extends BaseService {
  constructor() {
    super(File);
  }

  async uploadFileToS3(filePath, originalName, mimeType) {
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: BUCKET_NAME,
      Key: originalName,
      Body: fileContent,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    fs.unlinkSync(filePath); 

    const fileUrl = `https://${BUCKET_NAME}.storage.yandexcloud.net/${encodeURIComponent(originalName)}`;
    return fileUrl;
  }

  async deleteFileFromS3(fileName) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
  }

  async uploadSingleFile(file, { orderId, type }) {
    if (!file) {
      throw new Error("Файл не был предоставлен");
    }

    if (!fs.existsSync(file.path)) {
      throw new Error("Файл не найден во временном хранилище");
    }

    const fileUrl = await this.uploadFileToS3(file.path, file.originalname, file.mimetype);

    const newFileRecord = await File.create({
      fileName: file.originalname,
      fileUrl,
      orderId: orderId || null,
      type: type || null,
    });

    return newFileRecord;
  }

  async uploadMultipleFiles(files, { orderId, type }) {
    if (!orderId) {
      throw new Error("orderId обязателен");
    }

    const uploadedFiles = [];
    for (const file of files) {
      if (!fs.existsSync(file.path)) {
        throw new Error(`Файл ${file.originalname} не найден во временном хранилище`);
      }

      const fileUrl = await this.uploadFileToS3(file.path, file.originalname, file.mimetype);

      const newFileRecord = await File.create({
        fileName: file.originalname,
        fileUrl,
        orderId,
        type: type || null,
      });

      uploadedFiles.push(newFileRecord);
    }

    return uploadedFiles;
  }

  async removeFileById(id) {
    const fileRecord = await File.findByPk(id);
    if (!fileRecord) {
      throw new Error("Файл не найден в базе данных");
    }

    await this.deleteFileFromS3(fileRecord.fileName);
    await fileRecord.destroy();
    return true;
  }

  async removeFileByName(fileName) {
    const fileRecord = await File.findOne({ where: { fileName } });
    if (!fileRecord) {
      throw new Error("Файл не найден в базе данных");
    }

    await this.deleteFileFromS3(fileRecord.fileName);
    await fileRecord.destroy();
    return true;
  }

  async removeAllFiles() {
    const files = await File.findAll();
    if (files.length === 0) {
      throw new Error("Нет файлов для удаления");
    }

    for (const fileRecord of files) {
      await this.deleteFileFromS3(fileRecord.fileName);
    }

    await File.destroy({ where: {} });
    return true;
  }
}

module.exports = new FileService();
