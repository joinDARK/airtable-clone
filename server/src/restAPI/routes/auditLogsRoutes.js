const express = require('express');
const auditLogsController = require('../controllers/auditLogsController');

const router = express.Router();

router.get("/history", auditLogsController.getAll);
router.get("/history/user/:userName", auditLogsController.getAllByUserName);

module.exports = router;
