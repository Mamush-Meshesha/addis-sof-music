import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import songsRouter from "./routes/songs.js";
import createUploadRouter from "./routes/upload.js";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: true , limit: "50mb" })); 
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static(uploadsDir));

app.use("/upload", createUploadRouter(uploadsDir));

app.use("/api/songs", songsRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the Addis Music API");
});
app.listen(PORT, () => {
  console.log(`Server is running finely on ${PORT}`);
});
