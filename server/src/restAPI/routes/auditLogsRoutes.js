const express = require('express');
const auditLogsController = require('../controllers/auditLogsController');

const router = express.Router();

router.get("/history", auditLogsController.getAll);
router.get("/history/user/:userName", auditLogsController.getAllByUserName);

router.delete("/history/all", auditLogsController.deleteAll);
router.delete("/history/:id", auditLogsController.deleteById);
router.delete("/history/user/:userName", auditLogsController.deleteByUserName);

module.exports = router;
