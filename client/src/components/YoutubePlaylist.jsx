import React from "react";

const YoutubePlaylist = ({ title, handleClick, isSelected }) => {
	return (
		<div className={`y-playlist ${isSelected ? "selected" : ""}`} onClick={handleClick}>
			<p>{title}</p>
		</div>
	);
};

export default YoutubePlaylist;
