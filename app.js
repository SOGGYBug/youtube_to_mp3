const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const youtubedl = require("youtube-dl-exec");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const downloadsDir = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir);
}

app.get("/", (req, res) => {
  res.render("index", { downloadLink: null, error: null });
});

app.post("/download", async (req, res) => {
  const videoURL = req.body.url;
  if (!videoURL) {
    return res.render("index", { downloadLink: null, error: "Please provide a valid YouTube URL." });
  }

  try {
    const timestamp = Date.now();

    const outputTemplate = path.join(downloadsDir, `audio-${timestamp}.%(ext)s`);

    await youtubedl(videoURL, {
      extractAudio: true,
      audioFormat: "mp3",
      output: outputTemplate,
       });

    const outputFileName = `audio-${timestamp}.mp3`;
    const downloadPath = `/downloads/${outputFileName}`;

    res.render("index", {
      downloadLink: downloadPath,
      error: null,
    });
  } catch (err) {
    console.error("Download error:", err.stderr || err.message || err);
    res.render("index", {
      downloadLink: null,
      error: "Failed to convert video. Please check the URL or try a different one.",
    });
  }
});

app.use("/downloads", express.static(downloadsDir));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
