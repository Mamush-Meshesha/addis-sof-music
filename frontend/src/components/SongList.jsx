import React from "react";
import {
  SongCard,
  SongGrid,
  SongListItem,
  SongListView
} from "./styled/styledComponents";

const SongList = ({ viewMode }) => {
  const renderListView = () => {
    return (
      <SongListView>
        <SongListItem>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3>Sample Song Title</h3>
            <p>Sample Artist</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => alert("Edit Song")}>Edit</button>
            <button onClick={() => alert("delete")}>delete</button>
          </div>
          
        </SongListItem>
      </SongListView>
    );
  };

  const renderGridView = () => {
    return (
      <SongGrid>
        <SongCard>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3>Sample Song Title</h3>
            <p>Sample Artist</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => alert("Play Song")}>Play</button>
            <button onClick={() => alert("Delete Song")}>Delete</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => alert("Edit Song")}>Edit</button>
            <button onClick={() => alert("Add to Playlist")}>Add to Playlist</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => alert("Download Song")}>Download</button>
            <button onClick={() => alert("Share Song")}>Share</button>
          </div>
        </SongCard>
      </SongGrid>
    );
  };

  return <>{viewMode === "list" ? renderListView() : renderGridView()}</>;
};

export default SongList;
