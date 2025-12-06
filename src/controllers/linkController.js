import { db } from "../db.js";

const codeRegex = /^[A-Za-z0-9]{6,8}$/;

export async function createLink(req, res) {
  try {
    const url = req.body.url?.trim();
    const code = req.body.code?.trim();

    if (!url || !code) {
      return res.status(400).json({ error: "URL and code are required" });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // Validate code format
    if (!codeRegex.test(code)) {
      return res
        .status(400)
        .json({ error: "Code must be 6–8 alphanumeric characters" });
    }

    // Check duplicate code
    const exists = await db.query("SELECT code FROM links WHERE code = $1", [
      code,
    ]);
    if (exists.rowCount > 0) {
      return res.status(409).json({ error: "Code already exists" });
    }

    // Insert link
    await db.query(
      "INSERT INTO links (code, url, click_count, created_at) VALUES ($1, $2, 0, NOW())",
      [code, url]
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Create link error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function listLinks(req, res) {
  try {
    const result = await db.query(
      "SELECT * FROM links ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("List links error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getStats(req, res) {
  try {
    const { code } = req.params;
    const result = await db.query("SELECT * FROM links WHERE code = $1", [
      code,
    ]);
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Get stats error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteLink(req, res) {
  try {
    const { code } = req.params;
    const result = await db.query("DELETE FROM links WHERE code = $1", [code]);
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error("Delete link error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function redirect(req, res) {
  try {
    const { code } = req.params;
    const result = await db.query("SELECT * FROM links WHERE code = $1", [
      code,
    ]);
    if (result.rowCount === 0) return res.status(404).render("notFound");

    const link = result.rows[0];

    // Increment click count & update last_clicked
    await db.query(
      "UPDATE links SET click_count = click_count + 1, last_clicked = NOW() WHERE code = $1",
      [code]
    );

    // Redirect to target URL
    res.redirect(302, link.url);
  } catch (err) {
    console.error("Redirect error:", err);
    res.status(500).send("Server error");
  }
}
