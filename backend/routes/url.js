const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

// Shorten URL
router.post("/shorten", urlController.shorten);

// Get all URLs
router.get("/", urlController.list);

// Delete URL
router.delete("/:id", urlController.remove);

// Generate QR code
router.get("/qr/:id", urlController.qr);

module.exports = router;
