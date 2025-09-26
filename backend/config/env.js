require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Prefer MONGO_URI, fallback to legacy MONGODB_URI, then local default
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/urlshortener";

// Public base URL used to construct short links (no trailing slash)
const BASE_URL = (process.env.BASE_URL || `http://localhost:${PORT}`).replace(
  /\/+$/,
  ""
);

// Default timezone for formatting human-readable timestamps
const TIME_ZONE = process.env.TIME_ZONE || "Europe/Budapest";

module.exports = {
  PORT,
  MONGO_URI,
  BASE_URL,
  TIME_ZONE,
};
