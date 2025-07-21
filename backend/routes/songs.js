import { Router } from "express";
import {
  getSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong,
} from "../controllers/songs.js";
import upload from "../utils/uploadFile.js";

const router = Router();

router.get("/", getSongs);
router.post(
  '/create',
  upload.fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'thumbnailFile', maxCount: 1 },
  ]),
  createSong
);
router.get("/:id", getSongById);
router.put("/:id",upload.fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'thumbnailFile', maxCount: 1 },
  ]), updateSong);
router.delete("/:id", deleteSong);


export default router;