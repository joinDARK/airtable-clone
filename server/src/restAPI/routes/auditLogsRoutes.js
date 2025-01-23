const express = require('express');
const auditLogsController = require('../controllers/auditLogsController');

const router = express.Router();

router.get("/", auditLogsController.getAll);
router.get("/user/:userName", auditLogsController.getAllByUserName);

router.delete("/all", auditLogsController.deleteAll);
router.delete("/:id", auditLogsController.deleteById);
router.delete("/user/:userName", auditLogsController.deleteByUserName);

module.exports = router;
