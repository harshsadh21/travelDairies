import mongoose from "mongoose";

const connectToMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`error in connecting `, error.message);
  }
};

export default connectToMongodb;
