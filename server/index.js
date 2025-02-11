const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ dest: "../uploads/" });

const assembleChunks = async (chunksDir, totalChunks, finalPath) => {
  const writeStream = fs.createWriteStream(finalPath);

  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(chunksDir, `${i}.part`);
    const data = await fs.promises.readFile(chunkPath);
    writeStream.write(data);
  }

  writeStream.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};

app.get("/", (req, res) => {
  res.send("You are at the right place!");
});
app.post("/upload-chunk", upload.single("chunk"), (req, res) => {
  const { fileId, chunkIndex, totalChunks, fileName } = req.body;
  const chunkIndexNum = +chunkIndex;
  const totalChunksNum = +totalChunks;

  const chunksDir = path.join(__dirname, "..", "uploads", fileId);
  if (!fs.existsSync(chunksDir)) {
    fs.mkdirSync(chunksDir, { recursive: true });
  }

  const tempPath = req.file.path;
  const chunkFilename = path.join(chunksDir, `${chunkIndexNum}.part`);
  fs.renameSync(tempPath, chunkFilename);

  console.log(
    `Received chunk ${
      chunkIndexNum + 1
    } of ${totalChunksNum} for file ${fileName}`
  );

  fs.readdir(chunksDir, async (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error reading chunks directory" });
    }

    if (files.length === totalChunksNum) {
      const finalPath = path.join(
        __dirname,
        '..',
        "uploads",
        `${fileId}-${fileName}`
      );
      try {
        await assembleChunks(chunksDir, totalChunksNum, finalPath);

        fs.rm(chunksDir, { recursive: true, force: true }, (rmErr) => {
          if (rmErr) {
            console.error("Error removing chunks directory", rmErr);
          }
        });

        return res
          .status(200)
          .json({ message: "File uploaded and reassembled successfully." });
      } catch (assembleErr) {
        console.error("Error reassembling file:", assembleErr);
        return res.status(500).json({ error: "Error reassembling file" });
      }
    } else {
      res
        .status(200)
        .json({ message: `Chunk ${chunkIndexNum} uploaded successfully.` });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
