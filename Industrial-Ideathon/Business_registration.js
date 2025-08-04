const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Business_registration.html"));
});
// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(express.static("public")); // for your HTML files

// Route to handle form submission
app.post("/register", upload.fields([
  { name: "pan" },
  { name: "aadhaar" },
  { name: "addressProof" }
]), (req, res) => {
  const data = {
    businessType: req.body.businessType,
    documents: req.files,
  };

  console.log("Business Registered:", data);
  res.send("Business registration successful!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
