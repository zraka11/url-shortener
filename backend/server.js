const express = require("express");
const cors = require("cors");

const { PORT } = require("./config/env");
const { connectDB } = require("./config/db");
const urlRoutes = require("./routes/url");
const urlService = require("./services/urlService");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// API routes
app.use("/api/url", urlRoutes);

// Public redirect route
app.get("/:shortId", async (req, res, next) => {
  try {
    const destination = await urlService.resolveAndIncrement(
      req.params.shortId
    );
    return res.redirect(destination);
  } catch (err) {
    if (err.status === 410) return res.status(410).send("Link has expired");
    if (err.status === 404) return res.status(404).send("URL not found");
    return next(err);
  }
});

// 404 and error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
