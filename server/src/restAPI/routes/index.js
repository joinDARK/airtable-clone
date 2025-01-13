const express = require('express');
const uploadRoutes = require('./uploadRoutes');
const authRoutes = require('./authRoutes');
const auditLogsRoutes = require('./auditLogsRoutes');

const router = express.Router();

router.use('/files', uploadRoutes);
router.use('/', authRoutes, auditLogsRoutes);

module.exports = router;
