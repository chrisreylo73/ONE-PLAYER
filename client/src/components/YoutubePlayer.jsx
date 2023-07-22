import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import YoutubePlaylist from "./YoutubePlaylist";
const YoutubePlayer = ({youtubeVideoIds, youtubeSelectedPlaylist, handlePlayerReady, handlePlay, handlePause, handleNext, handlePrevious, handlePlaylistEnd, youtubeCurrentIndex, youtubeIsPlaying }) => {
	const opts = {
		playerVars: {
			autoplay: 1,
			controls: 0,
			listType: "playlist",
			list: youtubeVideoIds.join(","),
		},
	};
	return (
		<div className="Youtube-Player">
			<div className="youtubeVideo">
				<YouTube videoId={youtubeVideoIds[youtubeCurrentIndex]} opts={opts} onReady={handlePlayerReady} onEnd={handlePlaylistEnd} containerClassName="youtube-container" className="youtube-player" />
			</div>
			<div className="youtubePlayback">
				<button onClick={() => handlePrevious(youtubeVideoIds)}>{"<<"}</button>
				{!youtubeIsPlaying && <button onClick={handlePlay}>PLAY</button>}
				{youtubeIsPlaying && <button onClick={handlePause}>PAUSE</button>}
				<button onClick={() => handleNext(youtubeVideoIds)}>{">>"}</button>
			</div>
		</div>
	);
};
export default YoutubePlayer;
