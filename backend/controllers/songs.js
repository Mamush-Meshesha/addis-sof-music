import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSongs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", genre = "" } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filters = {};
    if (search) {
      filters.title = {
        contains: search,
        mode: "insensitive",
      };
    }
    if (genre) {
      filters.genre = genre;
    }

    const [songs, total] = await Promise.all([
      prisma.song.findMany({
        where: filters,
        orderBy: { updatedAt: "desc" },
        skip,
        take: parseInt(limit),
      }),
      prisma.song.count({ where: filters }),
    ]);

    res
      .status(200)
      .json({ songs, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    console.error("error fetchng songs", error);
  }
};

const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await prisma.song.findUnique({
      where: { id },
    });
    if (!song) {
      return res.status(404).json({ error: "song not foynd" });
    }
    res.status(200).json(song);
  } catch (error) {
    console.error("error fetching song", error);
  }
};

const createSong = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    const { title, artist, album, year, duration, genre } = req.body;

    if (!req.files || !req.files.audioFile || !req.files.thumbnailFile) {
      return res.status(400).json({ message: 'Audio and thumbnail files are required' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const filePath = `${baseUrl}/uploads/${req.files.audioFile[0].filename}`;
    const thumbnailPath = `${baseUrl}/uploads/${req.files.thumbnailFile[0].filename}`;

    const newSong = await prisma.song.create({
      data: {
        title,
        artist,
        album,
        year: parseInt(year),
        duration,
        genre,
        filePath,
        thumbnailPath,
      },
    });

    res.status(201).json(newSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateSong = async (req, res) => {
  const { id } = req.params;
  const { title, artist, album, year, duration, genre } = req.body;

  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const updateData = {
      title,
      artist,
      album,
      year: parseInt(year),
      duration,
      genre,
    };

    if (req.files) {
      if (req.files.audioFile && req.files.audioFile[0]) {
        updateData.filePath = `${baseUrl}/uploads/${req.files.audioFile[0].filename}`;
      }
      if (req.files.thumbnailFile && req.files.thumbnailFile[0]) {
        updateData.thumbnailPath = `${baseUrl}/uploads/${req.files.thumbnailFile[0].filename}`;
      }
    }

    const updatedSong = await prisma.song.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(updatedSong);
  } catch (error) {
    console.error("Error updating song:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.song.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting song:", error);
  }
};

export {createSong,deleteSong,getSongById,getSongs,updateSong}