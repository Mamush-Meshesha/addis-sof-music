import React, { useState } from "react";
import { FaMusic, FaPlus } from "react-icons/fa";
import {
  AppContainer,
  Button,
  Header,
  HeaderContent,
  Logo,
  MainContent,
} from "./styled/styledComponents";
import SongList from "./SongList";
import SongFormWithUpload from "./SongFormWithUpload";
import AudioPlayer from "./AudioPlayer";
import SearchAndFilter from "./SearchAndFilter";

const MusicApp = () => {
  const [viewMode, setViewMode] = useState("list");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleAddSong = () => {
    setEditingSong(null);
    setIsFormOpen(true);
  };

  const handleEditSong = (song) => {
    setEditingSong(song);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSong(null);
  };

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <FaMusic size={24} style={{ color: "hsl(var(--primary))" }} />
            <Logo>Addis Music</Logo>
          </div>
          <Button
            variant="primary"
            onClick={handleAddSong}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FaPlus size={16} />
            Add Song
          </Button>
        </HeaderContent>
      </Header>
      <MainContent>
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <SongList
          viewMode={viewMode}
          onEditSong={handleEditSong}
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
        />
      </MainContent>
      <SongFormWithUpload
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        song={editingSong}
      />
      <AudioPlayer />
    </AppContainer>
  );
};
export default MusicApp;
