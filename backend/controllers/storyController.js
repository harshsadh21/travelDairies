import TravelStory from "../models/travelStorymodel.js";
import { fileURLToPath } from "url";
import path from "path";
import fs, { truncateSync } from "fs";
// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// api for add Stories
export const AddStory = async (req, res) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  const userId = req.user._id;
  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return res
      .status(400)
      .json({ error: true, message: "All the feilds are required" });
  }

  /// parsedd the visited date from the millisecond to date object

  const parsedVisitedDate = new Date(parseInt(visitedDate));

  try {
    const travelStory = new TravelStory({
      title,
      story,
      visitedLocation,
      userId,
      imageUrl,
      visitedDate: parsedVisitedDate,
    });

    await travelStory.save();
    res
      .status(201)
      .json({ story: travelStory, message: "Successfully created " });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

// api for get stories
export const getStories = async (req, res) => {
  const userId = req.user;
  try {
    const travelStories = await TravelStory.find({ userId: userId }).sort({
      isFavourite: -1,
    });
    res.status(200).json(travelStories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// api for edit stories
export const editStory = async (req, res) => {
  const { id } = req.params;
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  const { userId } = req.user;

  // validate the feilds
  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return res
      .status(400)
      .json({ error: true, message: "All the feilds are required" });
  }

  const parsedVisitedDate = new Date(parseInt(visitedDate));
  try {
    const travelStory = await TravelStory.findOne({ _id: id });
    if (!travelStory) {
      return res.status(404).json({ error: true, message: "story not found" });
    }
    if (userId !== travelStory.userId) {
      return res
        .status(403)
        .json({ error: true, message: "You are not the authorized" });
    }

    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imageUrl = imageUrl;
    travelStory.visitedDate = parsedVisitedDate;
    await travelStory.save();
    res.status(200).json({ error: false, message: "updated succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// api for delete story
export const deleteStory = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const travelStory = await TravelStory.findOne({ _id: id });
    if (!travelStory) {
      return res.status(404).json({ error: true, message: "story not found" });
    }
    if (userId !== travelStory.userId) {
      return res
        .status(403)
        .json({ error: true, message: "You are not the authorized" });
    }

    const imageUrl = travelStory.imageUrl;

    const fileName = path.basename(imageUrl);

    const filepath = path.join(__dirname, "../uploads", fileName);
    fs.unlinkSync(filepath, (err) => {
      if (err) {
        console.error(err);
      }
    });
    await travelStory.deleteOne({ _id: id });
    res
      .status(200)
      .json({ error: false, message: "travel story deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const IsFav = async (req, res) => {
  const { id } = req.params;
  const { isFavourite } = req.body;

  try {
    const travelStory = await TravelStory.findOne({ _id: id });
    if (!travelStory) {
      return res.status(404).json({ error: true, message: "story not found" });
    }

    travelStory.isFavourite = isFavourite;
    await travelStory.save();
    res.status(200).json({ error: false, message: "isfav is updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const Search = async (req, res) => {
  const userId = req.user;
  const { query } = req.query;
  console.log(userId);
  if (!query) {
    return res.status(404).json({ error: true, message: "Query is required " });
  }
  try {
    const searchResults = await TravelStory.find({
      userId: userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { story: { $regex: query, $options: "i" } },
        { visitedLocation: { $regex: query, $options: "i" } },
      ],
    }).sort({ isFavourite: -1 });

    res.json({ stories: searchResults });
  } catch (error) {
    res.status(500).json({ errror: error.message });
  }
};

export const filter = async (req, res) => {
  const userId = req.user;
  const { startDate, endDate } = req.query;
  try {
    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));
    const filteredStories = await TravelStory.find({
      userId: userId,
      visitedDate: { $gte: start, $lte: end },
    }).sort({ isFavourite: -1 });
    res.json({ filteredStories: filteredStories });
  } catch (error) {
    res.status(500).json({ errror: error.message });
  }
};
