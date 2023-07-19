import React from "react";

const SpotifyPlaylist = ({ title, handleClick, isSelected }) => {
	return (
		<div className={`s-playlist ${isSelected ? "selected" : ""}`} onClick={handleClick}>
			<p>{title}</p>
		</div>
	);
};

export default SpotifyPlaylist;
