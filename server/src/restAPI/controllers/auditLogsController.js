const { auditLogsService } = require("../../services");

class AuditLogsController {
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
}

module.exports = AuditLogsController;
