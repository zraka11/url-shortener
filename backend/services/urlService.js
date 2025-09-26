const { nanoid } = require("nanoid");
const qrcode = require("qrcode");
const Url = require("../models/Url");
const { BASE_URL } = require("../config/env");
const { formatLocal } = require("../utils/time");

const EXPIRATION_OPTIONS = {
  "1 min": 1 * 60 * 1000,
  "5 min": 5 * 60 * 1000,
  "30 min": 30 * 60 * 1000,
  "1 hr": 60 * 60 * 1000,
  "5 hrs": 5 * 60 * 60 * 1000,
};

function computeExpiration(expiration) {
  const expirationMs = EXPIRATION_OPTIONS[expiration] || 24 * 60 * 60 * 1000; // default 24 hours
  return new Date(Date.now() + expirationMs);
}

async function createShortUrl(originalUrl, expiration) {
  const expirationTime = computeExpiration(expiration);
  const shortId = nanoid(8);

  const newUrl = new Url({
    originalUrl,
    shortId,
    expirationTime,
  });

  await newUrl.save();

  return {
    shortUrl: `${BASE_URL}/${shortId}`,
    id: newUrl._id,
    createdAtLocal: formatLocal(newUrl.createdAt),
    expirationLocal: formatLocal(newUrl.expirationTime),
  };
}

async function getAllUrls() {
  const docs = await Url.find().sort({ createdAt: -1 }).lean();
  return docs.map((u) => ({
    ...u,
    createdAtLocal: formatLocal(u.createdAt),
    expirationLocal: formatLocal(u.expirationTime),
  }));
}

async function deleteById(id) {
  return Url.findByIdAndDelete(id);
}

async function generateQrById(id) {
  const urlDoc = await Url.findById(id);
  if (!urlDoc) {
    const err = new Error("URL not found");
    err.status = 404;
    throw err;
  }
  const shortUrl = `${BASE_URL}/${urlDoc.shortId}`;
  return qrcode.toDataURL(shortUrl);
}

/**
 * Resolve shortId for redirect:
 * - returns originalUrl if found and not expired (and increments clickCount)
 * - throws 404 error if not found
 * - throws 410 error if expired
 */
async function resolveAndIncrement(shortId) {
  const urlDoc = await Url.findOne({ shortId });
  if (!urlDoc) {
    const err = new Error("URL not found");
    err.status = 404;
    throw err;
  }

  if (new Date() > urlDoc.expirationTime) {
    const err = new Error("Link has expired");
    err.status = 410;
    throw err;
  }

  urlDoc.clickCount += 1;
  await urlDoc.save();

  return urlDoc.originalUrl;
}

module.exports = {
  createShortUrl,
  getAllUrls,
  deleteById,
  generateQrById,
  resolveAndIncrement,
};
