import React, { useState } from "react";

const YoutubePlaylist = ({ title, handleClick, isSelected }) => {
  const [playlistIsHovered, setPlaylistIsHovered] = useState(false);

  const playlisthandleMouseEnter = () => {
    setPlaylistIsHovered(true);
  };

  const playlisthandleMouseLeave = () => {
    setPlaylistIsHovered(false);
  };

  return (
    <div
      className={`y-playlist ${isSelected ? "selected" : ""} ${
        playlistIsHovered ? "hovered" : ""
      }`}
      onClick={handleClick}
      onMouseEnter={playlisthandleMouseEnter}
      onMouseLeave={playlisthandleMouseLeave}
    >
      <p className="playlist-title">{title}</p>
    </div>
  );
};

export default YoutubePlaylist;
