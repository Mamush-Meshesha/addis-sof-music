
import { Router } from "express";
import { uploadFileController } from "../controllers/upload.js";
import multer from "multer";

const createUploadRouter = (uploadsDir) => {
  const router = Router();

  const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
  });

  const upload = multer({ storage });

  router.post(
    "/",
    upload.fields([
      { name: "file", maxCount: 1 }, 
      { name: "thumbnail", maxCount: 1 },
    ]),
    uploadFileController
  );

  return router;
};

export default createUploadRouter;
