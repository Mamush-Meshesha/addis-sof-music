export const uploadFileController = async (req, res) => {
  const files = req.files;

  if (!files || (!files.file && !files.thumbnail)) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const filePath = files.file
    ? `${baseUrl}/uploads/${files.file[0].filename}`
    : null;

  const thumbnailPath = files.thumbnail
    ? `${baseUrl}/uploads/${files.thumbnail[0].filename}`
    : null;

  res.status(200).json({
    message: "Files uploaded successfully",
    filePath,
    thumbnailPath,
  });
};
