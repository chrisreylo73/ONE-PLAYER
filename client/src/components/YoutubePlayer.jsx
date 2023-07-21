import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import YoutubePlaylist from "./YoutubePlaylist";

const YoutubePlayer = ({ youtubePlaylist, handlePlayerReady, handlePlay, handlePause, handleNext, handlePrevious, handlePlaylistEnd, youtubeCurrentIndex, youtubeIsPlaying }) => {
	// if (youtubePlaylist !== null) {
	console.log(youtubePlaylist);
	const songs = youtubePlaylist.songs.map((song) => song.url);
	const opts = {
		playerVars: {
			autoplay: 0,
			controls: 0,
			listType: "playlist",
			list: songs.join(","),
		},
	};
	return (
		<div className="Youtube-Player">
			<div className="youtubeVideo">
				<YouTube videoId={songs[youtubeCurrentIndex]} opts={opts} onReady={handlePlayerReady} onEnd={handlePlaylistEnd} containerClassName="youtube-container" className="youtube-player" />
			</div>
			<div className="youtubePlayback">
				<button onClick={() => handlePrevious(songs)}>{"<<"}</button>
				{!youtubeIsPlaying && <button onClick={handlePlay}>PLAY</button>}
				{youtubeIsPlaying && <button onClick={handlePause}>PAUSE</button>}
				<button onClick={() => handleNext(songs)}>{">>"}</button>
			</div>
		</div>
	);
	// }
};

export default YoutubePlayer;
