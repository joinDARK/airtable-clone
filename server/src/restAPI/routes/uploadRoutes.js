const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Создание
router.post("/", upload.single("file"), fileController.uploadFile);
router.post("/upload-multiple", upload.array("files"), fileController.uploadMultipleFiles);

// Чтение
router.get("/", fileController.getAllFiles);
router.get("/id/:id", fileController.getFileById);
router.get("/name/:fileName", fileController.getFileByName);
router.get("/type/:type", fileController.getFilesByType);
router.get("/order/:orderId", fileController.getFilesByOrderId);

// Обновление
router.put("/:id", fileController.updateFileById);

// Удаление
router.delete("/name/:fileName", fileController.deleteFileByName);
router.delete("/id/:id", fileController.deleteFileById);
router.delete("/all", fileController.deleteAllFiles);


module.exports = router;
