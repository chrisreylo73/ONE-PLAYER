import React from "react";

const SpotifyPlaylist = ({ title, handleClick }) => {
	// console.log(title);
	return (
		<div className="playlist" onClick={handleClick}>
			<p>{title}</p>
		</div>
	);
};

SpotifyPlaylist.defaultProps = {
	title: "Title?",
};

export default SpotifyPlaylist;
