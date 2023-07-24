import React, { useState } from "react";
const SpotifyPlaylist = ({ title, handleClick, isSelected }) => {
	const [playlistIsHovered, setPlaylistIsHovered] = useState(false);

  const playlisthandleMouseEnter = () => {
    setPlaylistIsHovered(true);
  };

  const playlisthandleMouseLeave = () => {
    setPlaylistIsHovered(false);
  };
	return (
		<div className={`s-playlist ${isSelected ? "selected" : ""} ${
			playlistIsHovered ? "hovered" : ""
		 }`} 
		 onClick={handleClick} 
		 onMouseEnter={playlisthandleMouseEnter}
		 onMouseLeave={playlisthandleMouseLeave}
	  >
			<p>{title}</p>
		</div>
	);
};

export default SpotifyPlaylist;
