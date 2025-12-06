// src/server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import apiRouter from "./routes/api.js";
import pagesRouter from "./routes/pages.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Register API routes first
app.use("/api", apiRouter);

// Register health endpoint BEFORE pagesRouter so it's not caught by the /:code redirect
// app.get("/healthz", (req, res) => {
//   res.status(200).json({ ok: true, version: "1.0" });
// });
app.get("/healthz", (req, res) => {
  const version = "1.0";
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  res.status(200).render("healthz", { version, timestamp });
});

// Then register page routes (which include the final catch-all /:code redirect)
app.use("/", pagesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on " + port));
