import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false, // Set to 'true' for HTTPS in production
    sameSite: "Lax",
  });
  return token;
};

export default genToken;
