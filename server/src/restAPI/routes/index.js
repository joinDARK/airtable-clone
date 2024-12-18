const express = require('express');
const uploadRoutes = require('../routes/uploadRoutes');

const router = express.Router();

router.use('/files', uploadRoutes);

module.exports = router;
