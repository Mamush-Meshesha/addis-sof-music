import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  IconButton,
  Label,
  Modal,
  ModalContent,
  ModalHeader,
} from "./styled/styledComponents";
import { FaTimes } from "react-icons/fa";
const song = {
    title: "Sample Song",
    artist: "Sample Artist",
    album: "Sample Album",
    year: 2023,
    duration: "3:45",
    genre: "Pop",
    filePath: "path/to/song.mp3",
    thumbnailPath: "path/to/thumbnail.jpg",

}

const SongFormWithUpload = ({isOpen, onClose,}) => {
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
    
  }, [ isOpen]);
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
      >
        <ModalHeader>
          <h2>Add New Song</h2>
          <IconButton>
            <FaTimes size={20} />
          </IconButton>
        </ModalHeader>
        <Form>
          <FormGroup>
            <Label>Audio File</Label>
            <input type="file" accept="audio/*" />
          </FormGroup>
          <FormGroup>
            <Label>Thumbnail</Label>
            <input type="image" placeholder="Enter song background" />
          </FormGroup>
          <FormGroup>
            <Label>Title</Label>
            <input type="text" placeholder="Enter song title" />
          </FormGroup>
          <FormGroup>
            <Label>Artist</Label>
            <input type="text" placeholder="Enter artist name" />
          </FormGroup>
          <FormGroup>
            <Label>Album</Label>
            <input type="text" placeholder="Enter album name" />
          </FormGroup>
          <FormGroup>
            <Label>Genre</Label>
            <input type="text" placeholder="Enter genre" />
          </FormGroup>
          <FormGroup>
            <Label> year</Label>
            <input type="number" placeholder="Enter release year" />
          </FormGroup>
          <FormGroup>
            <Label>duration</Label>
            <input type="text" placeholder="Enter song duration" />
          </FormGroup>
          <div>
            <IconButton variant="primary" type="submit">
              Submit
            </IconButton>
            <IconButton variant="destructive" onClick={onClose}>
              Cancel
            </IconButton>
          </div>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default SongFormWithUpload;
