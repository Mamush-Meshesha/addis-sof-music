import React, { useState,lazy,Suspense } from "react";
import { FaMusic, FaPlus } from "react-icons/fa";
import {
  AppContainer,
  Button,
  Header,
  HeaderContent,
  Logo,
  MainContent,
} from "./styled/styledComponents";
const SongList = lazy(() => import("./SongList"));
const SongFormWithUpload = lazy(() => import("./SongFormWithUpload"));
const AudioPlayer = lazy(() => import("./AudioPlayer"));
const SearchAndFilter = lazy(() => import("./SearchAndFilter")); // Consider if this is always needed immediately



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
      <Suspense fallback={<div>Loading Search and Filter...</div>}>
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </Suspense>
       <Suspense fallback={<div></div>}>
        <SongList
          viewMode={viewMode}
          onEditSong={handleEditSong}
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
        />
        </Suspense>
      </MainContent>
       <Suspense fallback={<div></div>}>
      <SongFormWithUpload
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        song={editingSong}
      />
      </Suspense>
      <Suspense fallback={<div></div>}>
      <AudioPlayer />
      </Suspense>
    </AppContainer>
  );
};
export default MusicApp;
