const { auditLogsService } = require("../../services");

class AuditLogsController {
  // ====== Чтение ======
  static async getAll(req, res) {
    try {
      const logs = await auditLogsService.getAll();
      return res.json(logs);
    } catch (error) {
      console.error("Error in getAll:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAllByUserName(req, res) {
    try {
      if (!req.params.userName) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userName = req.params.userName;
      const logs = await auditLogsService.getAllByUserName(userName);
      return res.json(logs);
    } catch (error) {
      console.error("Error in getAllByUserName:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // ====== Удаление ======
  static async deleteAll(req, res) {
    try {
      const deletedCount = await auditLogsService.deleteAll();
      return res.json({ message: `Deleted ${deletedCount} record(s).` });
    } catch (error) {
      console.error("Error in deleteAll:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const id = req.params.id;
      const deletedCount = await auditLogsService.deleteById(id);

      if (!deletedCount) {
        return res.status(404).json({ error: "Record not found." });
      }

      return res.json({ message: `Deleted ${deletedCount} record(s).` });
    } catch (error) {
      console.error("Error in deleteById:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteByUserName(req, res) {
    try {
      const userName = req.params.userName;
      const deletedCount = await auditLogsService.deleteByUserName(userName);

      return res.json({ message: `Deleted ${deletedCount} record(s).` });
    } catch (error) {
      console.error("Error in deleteByUserName:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuditLogsController;
