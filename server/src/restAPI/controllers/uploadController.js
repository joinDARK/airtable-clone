// controllers/uploadController.js

const { fileService } = require("../../services");

function setUtf8Header(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
}

/**
 * Загрузка одного файла.
 * Создаёт запись в таблице File с использованием fileService.uploadSingleFile(...)
 * и прокидывает userName, чтобы хуки смогли сохранить изменения в AuditLog (через userName).
 */
exports.uploadFile = async (req, res) => {
  try {
    if (!req.user?.login) {
      throw new Error("Необходимо указать userName для загрузки файлов");
    }

    const userName = req.user.login;
    const { orderId, type } = req.body || {};

    const fileRecord = await fileService.uploadSingleFile(
      req.file,
      { orderId, type },
      userName
    );

    setUtf8Header(res);
    res.json({ message: "Файл успешно загружен", file: fileRecord });
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Загрузка нескольких файлов.
 * Аналогично, передаём userName в fileService.uploadMultipleFiles(...).
 */
exports.uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.user?.login) {
      throw new Error("Необходимо указать userName для загрузки файлов");
    }

    const userName = req.user.login;
    const { orderId, type } = req.body;

    const files = await fileService.uploadMultipleFiles(
      req.files,
      { orderId, type },
      userName
    );

    setUtf8Header(res);
    res.json({ message: "Файлы успешно загружены", files });
  } catch (error) {
    console.error("Ошибка при загрузке файлов:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Получение файла по имени (GET).
 * Операция только читает данные, userName в данном случае не нужен
 * (если вам не надо логировать чтение).
 */
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

/**
 * Получение файла по ID (GET).
 */
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

/**
 * Получение всех файлов (GET).
 */
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

/**
 * Получение файлов по типу (GET).
 */
exports.getFilesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const files = await fileService.model.findAll({ where: { type } });
    if (!files || files.length === 0) {
      setUtf8Header(res);
      return res
        .status(404)
        .json({ message: "Не найдено файлов для данного типа" });
    }
    setUtf8Header(res);
    res.json({ files });
  } catch (error) {
    console.error("Ошибка при получении файлов по типу:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Получение файлов по orderId (GET).
 */
exports.getFilesByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const files = await fileService.model.findAll({ where: { orderId } });
    if (!files || files.length === 0) {
      setUtf8Header(res);
      return res
        .status(404)
        .json({ message: "Не найдено файлов для данного orderId" });
    }
    setUtf8Header(res);
    res.json({ files });
  } catch (error) {
    console.error("Ошибка при получении файлов по orderId:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Обновление файла по ID (PUT).
 * Здесь также важно передать userName, чтобы хук (beforeUpdate/afterUpdate) сохранил изменения.
 */
exports.updateFileById = async (req, res) => {
  try {
    if (!req.user?.login) {
      throw new Error("Необходимо указать userName для загрузки файлов");
    }
    const userName = req.user.login;

    const { id } = req.params;
    const { orderId, type } = req.body;

    // Предположим, у вас в fileService есть метод update(id, data, userName)
    const updatedFile = await fileService.update(id, { orderId, type }, userName);

    setUtf8Header(res);
    res.json({ message: "Файл успешно обновлен", file: updatedFile });
  } catch (error) {
    console.error("Ошибка при обновлении файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Удаление файла по имени (DELETE).
 */
exports.deleteFileByName = async (req, res) => {
  try {
    if (!req.user?.login) {
      throw new Error("Необходимо указать userName для загрузки файлов");
    }
    const userName = req.user.login;

    const { fileName } = req.params;
    await fileService.removeFileByName(fileName, userName);

    setUtf8Header(res);
    res.json({ message: `Файл ${fileName} успешно удален` });
  } catch (error) {
    console.error("Ошибка при удалении файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Удаление файла по ID (DELETE).
 */
exports.deleteFileById = async (req, res) => {
  try {
    if (!req.user?.login) {
      throw new Error("Необходимо указать userName для загрузки файлов");
    }
    const userName = req.user.login;

    const { id } = req.params;
    await fileService.removeFileById(id, userName);

    setUtf8Header(res);
    res.json({ message: `Файл с id ${id} успешно удален` });
  } catch (error) {
    console.error("Ошибка при удалении файла:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Удаление всех файлов (DELETE).
 */
exports.deleteAllFiles = async (req, res) => {
  try {
    if (!req.user?.login) {
      throw new Error("Необходимо указать userName для загрузки файлов");
    }
    const userName = req.user.login;

    await fileService.removeAllFiles(userName);

    setUtf8Header(res);
    res.json({ message: "Все файлы успешно удалены" });
  } catch (error) {
    console.error("Ошибка при удалении всех файлов:", error);
    setUtf8Header(res);
    res.status(500).json({ message: error.message });
  }
};
