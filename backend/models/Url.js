const mongoose = require("mongoose");
const { formatLocal } = require("../utils/time");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    expirationTime: {
      type: Date,
      required: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    // Convenience fields stored in local time for direct DB inspection (human readable)
    createdAtLocal: {
      type: String,
    },
    updatedAtLocal: {
      type: String,
    },
    expirationLocal: {
      type: String,
    },
  },
  {
    // Store createdAt/updatedAt in UTC (MongoDB default); format in API for local time
    timestamps: true,
  }
);

// Maintain local-time snapshots alongside UTC timestamps
urlSchema.pre("save", function (next) {
  // createdAt is set by timestamps:true when doc is new
  if (this.isNew || this.isModified("createdAt")) {
    this.createdAtLocal = formatLocal(this.createdAt);
  }
  // expirationLocal reflects current expirationTime
  if (this.isNew || this.isModified("expirationTime")) {
    this.expirationLocal = formatLocal(this.expirationTime);
  }
  // always refresh updatedAtLocal
  this.updatedAtLocal = formatLocal(new Date());
  next();
});

module.exports = mongoose.model("Url", urlSchema);
