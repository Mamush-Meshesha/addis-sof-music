import React, { useEffect, useState } from "react";
import {
    Button,
  Form,
  FormGroup,
  IconButton,
  Input,
  Label,
  Modal,
  ModalContent,
  ModalHeader,
  Select,
} from "./styled/styledComponents";
import { FaTimes } from "react-icons/fa";
import FileUpload from "./FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { createSongRequest, updateSongRequest } from "../stores/slices/songSlice";

const genres = [
  "Rock",
  "Pop",
  "Hip-Hop",
  "R&B",
  "Jazz",
  "Electronic",
  "Country",
  "Classical",
  "Blues",
  "Folk",
  "Alternative",
  "Indie",
  "Metal",
  "Punk",
  "Reggae",
  "Soul",
  "Funk",
];
const SongFormWithUpload = ({ isOpen, onClose, song }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.songs.loading);

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    year: new Date().getFullYear(),
    duration: "",
    genre: "Pop",
  });

  const [audioFile, setAudioFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album,
        year: song.year,
        duration: song.duration,
        genre: song.genre,
      });
      setAudioUrl(song.filePath || "");
      setThumbnailUrl(song.thumbnailPath || "");
    } else {
      setFormData({
        title: "",
        artist: "",
        album: "",
        year: new Date().getFullYear(),
        duration: "",
        genre: "Pop",
      });
      setAudioUrl("");
      setThumbnailUrl("");
      setAudioFile(null);
      setThumbnailFile(null);
      setAudioProgress(0);
      setThumbnailProgress(0);
    }
  }, [song, isOpen]);

   const simulateUpload = (file, setProgress, onComplete) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          const url = URL.createObjectURL(file);
          onComplete(url);
          return 100;
        }
        return next;
      });
    }, 200);
  };

  const handleAudioUpload = (file) => {
    setAudioFile(file);
    simulateUpload(file, setAudioProgress, (url) => {
      setAudioUrl(url);

      const audio = new Audio(url);
      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setFormData((prev) => ({
          ...prev,
          duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
        }));
      });
    });
  };

  const handleThumbnailUpload = (file) => {
    setThumbnailFile(file);
    simulateUpload(file, setThumbnailProgress, setThumbnailUrl);
  };

  const handleAudioRemove = () => {
    setAudioFile(null);
    setAudioProgress(0);
    if (audioUrl.startsWith("blob:")) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl("");
  };

  const handleThumbnailRemove = () => {
    setThumbnailFile(null);
    setThumbnailProgress(0);
    if (thumbnailUrl.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailUrl);
    }
    setThumbnailUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalAudioUrl = audioUrl;

    const songData = {
      ...formData,
      audioUrl: finalAudioUrl,
      thumbnailUrl: thumbnailUrl,
      audioFile: audioFile,
      thumbnailFile: thumbnailFile,
    };

    if (song) {
      dispatch(updateSongRequest({ ...songData, id: song.id }));
    } else {
      dispatch(createSongRequest(songData));
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) || 0 : value,
    }));
  };
  if (!isOpen) return null;

  return (
   <Modal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "600px",
          maxHeight: "90vh",
          overscrollBehavior: "contain",
          overflowY: "auto",
        }}
      >
        <ModalHeader>
          <h2>{song ? "Edit Song" : "Add New Song"}</h2>
          <IconButton onClick={onClose}>
            <FaTimes size={20} /> 
          </IconButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Audio File</Label>
            <FileUpload
              type="audio"
              accept="audio/*"
              maxSize={50 * 1024 * 1024} 
              onFileSelect={handleAudioUpload}
              onFileRemove={handleAudioRemove}
              currentFile={audioFile}
              uploadProgress={audioProgress}
              disabled={loading}
            />
           
        
          </FormGroup>

          <FormGroup>
            <Label>Thumbnail (Optional)</Label>
            <FileUpload
              type="image"
              accept="image/*"
              maxSize={5 * 1024 * 1024} 
              onFileSelect={handleThumbnailUpload}
              onFileRemove={handleThumbnailRemove}
              currentFile={thumbnailFile}
              uploadProgress={thumbnailProgress}
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter song title"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="artist">Artist *</Label>
            <Input
              id="artist"
              name="artist"
              type="text"
              value={formData.artist}
              onChange={handleChange}
              placeholder="Enter artist name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="album">Album *</Label>
            <Input
              id="album"
              name="album"
              type="text"
              value={formData.album}
              onChange={handleChange}
              placeholder="Enter album name"
              required
            />
          </FormGroup>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <FormGroup>
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                name="year"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                name="duration"
                type="text"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 3:45"
                pattern="[0-9]:[0-5][0-9]"
                title="Format: M:SS (e.g., 3:45)"
                required
              />
            </FormGroup>
          </div>

          <FormGroup>
            <Label htmlFor="genre">Genre</Label>
            <Select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Select>
          </FormGroup>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Saving..." : song ? "Update Song" : "Add Song"}
            </Button>
          </div>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default SongFormWithUpload;
