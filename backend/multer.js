import multer from "multer";
// import path from "path";

/// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpeg");
  },
});
// file filter to only acccept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new error("only images are allowed "), false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
