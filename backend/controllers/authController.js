import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import genToken from "../utils/genToken.js";

export const sign = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password doesnot match" });
    }
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exits " });
    }
    // HAsh password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new userModel({
      fullName,
      username,
      password: hashedPassword,
      profilePic: boyProfilePic,
    });
    const token = genToken(newUser._id, res);
    await newUser.save();
    res.status(201).send({
      token: token,
      _id: newUser._id,
      username: newUser.username,
      fullName: newUser.fullName,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "please fill the field" });
    }
    const user = await userModel.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid creditials" });
    }
    const token = genToken(user._id, res);
    res.status(200).send({
      token: token,
      username: user.username,
      _id: user._id,
      sucuss: " login succesfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const logginedUserId = req.user._id;

    const isUser = await userModel
      .findOne({ _id: logginedUserId })
      .select("-password");
    if (!isUser) {
      res.status(401);
    }
    return res.status(200).json({ user: isUser, message: "success" });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ error: "internal server error " });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", " ");
    return res.status(200).json({ message: "Loggout Succesfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
