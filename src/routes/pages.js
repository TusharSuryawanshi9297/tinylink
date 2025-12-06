import express from "express";
import { redirect } from "../controllers/linkController.js";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM links ORDER BY created_at DESC");
  res.render("dashboard", { links: result.rows });
});

router.get("/code/:code", async (req, res) => {
  const { code } = req.params;
  const result = await db.query("SELECT * FROM links WHERE code = $1", [code]);
  if (result.rowCount === 0) return res.status(404).render("notFound");
  res.render("stats", { link: result.rows[0] });
});

// **About page**
router.get("/about", (req, res) => {
  res.render("about");
});

// **Contact page**
router.get("/contact", (req, res) => {
  res.render("contact");
});

// MUST BE LAST
router.get("/:code", redirect);

export default router;
