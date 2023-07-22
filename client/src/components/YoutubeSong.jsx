import React from "react";

const YoutubeSong = ({ youtubeChooseTrack, track, setIsSpotifySong }) => {
	const minutes = Math.floor(track.duration_ms / 60000);
	const seconds = Math.floor((track.duration_ms % 60000) / 1000);
	const formattedLength = track.duration_ms ? `${minutes}:${seconds.toString().padStart(2, "0")}` : "length?";
	function handlePlay() {
		setIsSpotifySong(false);
		youtubeChooseTrack(track.snippet.resourceId.videoId); // chooseTrack(track);
	}
	//onClick={handlePlay}
	return (
		<div className="song" onClick={handlePlay}>
			{/* <img className="album-cover" src={track.album.images[0].url} alt="Album Cover" /> */}
			<img className="album-cover" src={track.snippet.thumbnails.default?.url} alt="Album Cover" />
			<div className="songInfo">
				<p id="title">{track.snippet.title}</p>
				<p id="artist">{""}</p>
			</div>
			<p>{"0:00"}</p>
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
