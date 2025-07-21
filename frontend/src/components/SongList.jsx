import React, { useEffect, lazy, Suspense } from "react";
import {
  ActionButtons,
  IconButton,
  LoadingSpinner,
  Pagination,
  PaginationButton,
  SongArtist,
  SongCard,
  SongDetails,
  SongGrid,
  SongListActions,
  SongListDuration,
  SongListInfo,
  SongListItem,
  SongListThumbnail,
  SongListView,
  SongMeta,
  SongTitle,
} from "./styled/styledComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSongRequest,
  fetchSongsRequest,
  setCurrentPage,
} from "../stores/slices/songSlice";
import { FaEdit, FaMusic, FaPause, FaPlay, FaTrashAlt } from "react-icons/fa";
import { pauseSong, playSong } from "../stores/slices/playerSlice";
const MusicVisualization = lazy(() =>
  import("../components/MusicVisualization")
);

const SongList = ({ viewMode, onEditSong, searchTerm, selectedGenre }) => {
  const dispatch = useDispatch();
  const { songs, loading, currentPage, totalPages } = useSelector(
    (state) => state.songs
  );
  console.log("songs", songs);
  const { currentSong, isPlaying } = useSelector((state) => state.audioPlayer);

  useEffect(() => {
    dispatch(
      fetchSongsRequest({
        page: currentPage,
        search: searchTerm,
        genre: selectedGenre,
      })
    );
  }, [dispatch, currentPage, searchTerm, selectedGenre]);

  const handleDeleteSong = (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongRequest(id));
    }
  };

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id && isPlaying) {
      dispatch(pauseSong());
    } else {
      dispatch(playSong(song));
    }
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const filteredSongs = songs?.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? song.genre === selectedGenre : true;
    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return <LoadingSpinner />;
  }
  const totalPagesNum = Number(totalPages) || 0;
  console.log("total page", totalPagesNum);
  console.log("total  1", totalPages);

  const renderListView = () => (
    <SongListView>
      {filteredSongs?.map((song, index) => {
        const isCurrentSong = currentSong?.id === song.id;
        const songIsPlaying = isCurrentSong && isPlaying;

        return (
          <SongListItem
            key={song.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            isPlaying={songIsPlaying}
          >
            {songIsPlaying && (
              <Suspense fallback={null}>
                <MusicVisualization isPlaying={songIsPlaying} size="small" />
              </Suspense>
            )}

            <SongListThumbnail>
              {song.thumbnailUrl ? (
                <img src={song.thumbnailUrl} alt={song.title} />
              ) : (
                <FaMusic
                  size={24}
                  style={{ color: "hsl(var(--muted-foreground))" }}
                />
              )}
            </SongListThumbnail>

            <SongListInfo>
              <h4>{song.title}</h4>
              <p>
                {song.artist} • {song.album}
              </p>
              <div className="meta">
                {song.year} • {song.genre}
              </div>
            </SongListInfo>

            <SongListDuration>{song.duration}</SongListDuration>

            <SongListActions>
              <IconButton
                onClick={() => handlePlayPause(song)}
                active={songIsPlaying}
              >
                {songIsPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}{" "}
              </IconButton>

              <IconButton onClick={() => onEditSong(song)} title="Edit song">
                <FaEdit size={16} />
              </IconButton>

              <IconButton
                variant="destructive"
                onClick={() => handleDeleteSong(song.id)}
                title="Delete song"
              >
                <FaTrashAlt size={16} />
              </IconButton>
            </SongListActions>
          </SongListItem>
        );
      })}
    </SongListView>
  );

  const renderGridView = () => (
    <SongGrid>
      {filteredSongs?.map((song, index) => {
        const isCurrentSong = currentSong?.id === song.id;
        const songIsPlaying = isCurrentSong && isPlaying;

        return (
          <SongCard
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            style={{
              borderColor: isCurrentSong ? "hsl(var(--primary))" : undefined,
              boxShadow: isCurrentSong ? "var(--shadow-glow)" : undefined,
            }}
          >
            {songIsPlaying && (
              <MusicVisualization isPlaying={songIsPlaying} size="small" />
            )}

            {song.thumbnailUrl && (
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  borderRadius: "calc(var(--radius) - 2px)",
                  overflow: "hidden",
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                <img
                  src={song.thumbnailUrl}
                  alt={song.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: songIsPlaying ? 1 : 0,
                    transition: "var(--transition-smooth)",
                  }}
                >
                  <IconButton
                    onClick={() => handlePlayPause(song)}
                    style={{
                      background: "rgba(0, 0, 0, 0.7)",
                      backdropFilter: "blur(10px)",
                      color: "white",
                      border: "none",
                      width: "3rem",
                      height: "3rem",
                    }}
                  >
                    {songIsPlaying ? (
                      <FaPause size={20} />
                    ) : (
                      <FaPlay size={20} />
                    )}{" "}
                  </IconButton>
                </div>
              </div>
            )}

            <SongTitle>{song.title}</SongTitle>
            <SongArtist>{song.artist}</SongArtist>
            <SongMeta>
              <div style={{ marginBottom: "0.25rem" }}>{song.album}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                {song.year} • {song.genre} • {song.duration}
              </div>
            </SongMeta>

            <SongDetails>
              <IconButton
                onClick={() => handlePlayPause(song)}
                style={{
                  background: songIsPlaying ? "hsl(var(--primary))" : undefined,
                  color: songIsPlaying ? "white" : undefined,
                }}
              >
                {songIsPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}{" "}
              </IconButton>

              <ActionButtons>
                <IconButton onClick={() => onEditSong(song)} title="Edit song">
                  <FaEdit size={16} />
                </IconButton>
                <IconButton
                  variant="destructive"
                  onClick={() => handleDeleteSong(song.id)}
                  title="Delete song"
                >
                  <FaTrashAlt size={16} />
                </IconButton>
              </ActionButtons>
            </SongDetails>
          </SongCard>
        );
      })}
    </SongGrid>
  );

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    // Previous button
    pages.push(
      <PaginationButton
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PaginationButton>
    );

    // Page number buttons
    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationButton
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    // Next button
    pages.push(
      <PaginationButton
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </PaginationButton>
    );

    return pages;
  };

  return (
    <>
      {viewMode === "grid" ? renderGridView() : renderListView()}

      {totalPagesNum > 1 && <Pagination>{renderPagination()}</Pagination>}
    </>
  );
};

export default SongList;
