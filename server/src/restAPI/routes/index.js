const express = require('express');

const authRoutes = require('./authRoutes');
const userRouter = require('./userRouter');
const uploadRoutes = require('./uploadRoutes');
const auditLogsRoutes = require('./auditLogsRoutes');

const router = express.Router();

router.use('/files', uploadRoutes);
router.use('/users', userRouter);
router.use('/auth', authRoutes);
router.use('/history', auditLogsRoutes);

module.exports = router;
