import React from "react";

const YoutubeSong = ({ youtubeChooseTrack, track, setIsSpotifySong }) => {
	const minutes = Math.floor(track.duration_ms / 60000);
	const seconds = Math.floor((track.duration_ms % 60000) / 1000);
	const formattedLength = track.duration_ms ? `${minutes}:${seconds.toString().padStart(2, "0")}` : "length?";
	function handlePlay() {
		setIsSpotifySong(false);
		youtubeChooseTrack(track.songId); // chooseTrack(track);
	}
	//onClick={handlePlay}
	return (
		<div className="song" onClick={handlePlay}>
			{/* <img className="album-cover" src={track.album.images[0].url} alt="Album Cover" /> */}
			<div className="songInfo">
				<p id="title">{track.name}</p>
				<p id="artist">{track.artist}</p>
				{/* <p id="artist">{track.artists[0].name}</p> */}
			</div>
			{/* <p>{formattedLength}</p> */}
		</div>
	);
};

YoutubeSong.defaultProps = {
	title: "Title?",
	album: "Album?",
	length: "Length?",
};

export default YoutubeSong;
// const albumCover = track.album.images[0].url;
// const title = track.name;
// const artist = track.artists[0].name;
// const album = track.album.name;
// const length = track.duration_ms;
