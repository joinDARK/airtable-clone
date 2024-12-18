const { fileService } = require("../../services");

function setUtf8Header(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
}

exports.uploadFile = async (req, res) => {
  try {
    const { orderId, type } = req.body || {};
    const fileRecord = await fileService.uploadSingleFile(req.file, { orderId, type });
    setUtf8Header(res);
    res.json({ message: "Файл успешно загружен", file: fileRecord });
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.uploadMultipleFiles = async (req, res) => {
  try {
    const { orderId, type } = req.body;
    const files = await fileService.uploadMultipleFiles(req.files, { orderId, type });
    setUtf8Header(res);
    res.json({ message: "Файлы успешно загружены", files });
  } catch (error) {
    console.error("Ошибка при загрузке файлов:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.getFileByName = async (req, res) => {
  try {
    const { fileName } = req.params;
    const file = await fileService.model.findOne({ where: { fileName } });
    if (!file) {
      setUtf8Header(res);
      return res.status(404).json({ message: "Файл не найден в базе данных" });
    }
    setUtf8Header(res);
    res.json({ file });
  } catch (error) {
    console.error("Ошибка при получении файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.getFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await fileService.getById(id);
    setUtf8Header(res);
    res.json({ file });
  } catch (error) {
    console.error("Ошибка при получении файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await fileService.getAll();
    setUtf8Header(res);
    res.json({ files });
  } catch (error) {
    console.error("Ошибка при получении файлов:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.getFilesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const files = await fileService.model.findAll({ where: { type } });
    if (!files || files.length === 0) {
      setUtf8Header(res);
      return res.status(404).json({ message: "Не найдено файлов для данного типа" });
    }
    setUtf8Header(res);
    res.json({ files });
  } catch (error) {
    console.error("Ошибка при получении файлов по типу:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.getFilesByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const files = await fileService.model.findAll({ where: { orderId } });
    if (!files || files.length === 0) {
      setUtf8Header(res);
      return res.status(404).json({ message: "Не найдено файлов для данного orderId" });
    }
    setUtf8Header(res);
    res.json({ files });
  } catch (error) {
    console.error("Ошибка при получении файлов по orderId:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.updateFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, type } = req.body;

    const updatedFile = await fileService.update(id, { orderId, type });
    setUtf8Header(res);
    res.json({ message: "Файл успешно обновлен", file: updatedFile });
  } catch (error) {
    console.error("Ошибка при обновлении файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFileByName = async (req, res) => {
  try {
    const { fileName } = req.params;
    await fileService.removeFileByName(fileName);
    setUtf8Header(res);
    res.json({ message: `Файл ${fileName} успешно удален` });
  } catch (error) {
    console.error("Ошибка при удалении файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFileById = async (req, res) => {
  try {
    const { id } = req.params;
    await fileService.removeFileById(id);
    setUtf8Header(res);
    res.json({ message: `Файл с id ${id} успешно удален` });
  } catch (error) {
    console.error("Ошибка при удалении файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAllFiles = async (req, res) => {
  try {
    await fileService.removeAllFiles();
    setUtf8Header(res);
    res.json({ message: "Все файлы успешно удалены" });
  } catch (error) {
    console.error("Ошибка при удалении всех файлов:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};
