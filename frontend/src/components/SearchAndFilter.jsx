import React, { useState } from "react";
import { IconButton, Input, SearchSection, Select } from "./styled/styledComponents";
import { FaFilter, FaList, FaSearch, FaTh, FaTimes } from "react-icons/fa";
const genres = [
  "",
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
const SearchAndFilter = ({ viewMode, onViewModeChange }) => {
  const [localSearch, setLocalSearch] = useState("");
  const [localGenre, setLocalGenre] = useState("");

  return (
    <>
      <SearchSection>
        <div style={{ position: "relative", flex: "1", maxWidth: "400px" }}>
          <FaSearch
            size={20}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "hsl(var(--muted-foreground))",
            }}
          />
          <Input
            type="text"
            placeholder="Search songs, artists, or albums..."
            onChange={(e) => alert("finding...")}
            style={{ paddingLeft: "44px" }}
          />
        </div>

        <div style={{ position: "relative", minWidth: "160px" }}>
          <FaFilter 
            size={20}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "hsl(var(--muted-foreground))",
            }}
          />
          <Select
            onChange={(e) => alert("selecting")}
            style={{ paddingLeft: "44px" }}
          >
            <option value="">All Genres</option>
            {genres.slice(1).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Select>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <IconButton
            onClick={() => onViewModeChange("grid")}
            active={viewMode === "grid"}
            title="Grid view"
          >
            <FaTh size={16} />
          </IconButton>
          <IconButton
            onClick={() => onViewModeChange("list")}
            active={viewMode === "list"}
            title="List view"
          >
            <FaList size={16} />
          </IconButton>
        </div>

        <FaTimes size={16} />
      </SearchSection>
    </>
  );
};

export default SearchAndFilter;
