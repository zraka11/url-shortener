const urlService = require("../services/urlService");

async function shorten(req, res, next) {
  try {
    const { url, expiration } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    const result = await urlService.createShortUrl(url, expiration);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const urls = await urlService.getAllUrls();
    return res.json(urls);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await urlService.deleteById(req.params.id);
    return res.json({ message: "URL deleted" });
  } catch (err) {
    next(err);
  }
}

async function qr(req, res, next) {
  try {
    const data = await urlService.generateQrById(req.params.id);
    return res.json({ qrCode: data });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  shorten,
  list,
  remove,
  qr,
};
