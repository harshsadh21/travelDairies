import express from "express";
import fs from "fs";

import { fileURLToPath } from "url";
import path from "path";

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  AddStory,
  getStories,
  editStory,
  deleteStory,
  IsFav,
  Search,
  filter,
} from "../controllers/storyController.js";

import protectRoute from "../middleware/protectRoute.js";
import upload from "../multer.js";

const router = express.Router();

router.post("/add-travel-story", protectRoute, AddStory);
router.get("/get-all-stories", protectRoute, getStories);
router.put("/edit-story/:id", protectRoute, editStory);
router.delete("/delete-story/:id", protectRoute, deleteStory);
router.put("/update-Isfav/:id", protectRoute, IsFav);
router.get("/search", protectRoute, Search);
router.get("/filter", protectRoute, filter);

router.post("/image-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
});
router.delete("/delete-image", async (req, res) => {
  const { imageUrl } = req.query;
  if (!imageUrl) {
    return res.status(400).json({ error: true, message: "no url " });
  }
  try {
    const filename = path.basename(imageUrl);

    const filePath = path.join(__dirname, "../uploads", filename);
    //console.log(filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: "Image is deleted " });
    } else {
      res.status(400).json({ error: true, message: "Image is  not found " });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
export default router;
