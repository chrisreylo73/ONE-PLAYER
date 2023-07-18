import React from "react";

const YoutubePlaylist = ({ title, handleClick }) => {
	// console.log(title);
	const test = () => {
		console.log("WTF");
	};
	return (
		<div className="playlist" onClick={handleClick}>
			<p>{title}</p>
		</div>
	);
};

YoutubePlaylist.defaultProps = {
	title: "Title?",
};

export default YoutubePlaylist;
