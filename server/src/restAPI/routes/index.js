const express = require('express');
const uploadRoutes = require('./uploadRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/files', uploadRoutes);
router.use('/', authRoutes);

module.exports = router;
