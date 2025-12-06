import express from "express";
import {
  createLink,
  listLinks,
  getStats,
  deleteLink,
} from "../controllers/linkController.js";

const router = express.Router();

router.post("/links", createLink);
router.get("/links", listLinks);
router.get("/links/:code", getStats);
router.delete("/links/:code", deleteLink);

export default router;
