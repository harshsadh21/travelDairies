import mongoose, { Schema } from "mongoose";

const TravelStorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    visitedLocation: {
      type: [String],
      default: [],
    },

    isFavourite: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    imageUrl: {
      type: String,
      required: true,
    },
    visitedDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TravelStory = mongoose.model("TravelStory", TravelStorySchema);
export default TravelStory;
