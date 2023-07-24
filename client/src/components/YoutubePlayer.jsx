import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
const YoutubePlayer = ({youtubeVideoIds, youtubeSelectedPlaylist, handlePlayerReady, handlePlay, handlePause, handleNext, handlePrevious, handlePlaylistEnd, youtubeCurrentIndex, youtubeIsPlaying }) => {
	const opts = {
		playerVars: {
			autoplay: 1,
			controls: 0,
			modestbranding: 0, // Add this option to remove YouTube logo
			showRelatedVideos: 0, // Add this option to turn off related videos
			rel: 0,
			fs: 1,
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
			  <button id="prev" onClick={() => handlePrevious(youtubeVideoIds)}>
			    <img src={process.env.PUBLIC_URL + "./prev.png"} alt="Previous" />
			  </button>

			  {!youtubeIsPlaying && (
			    <button id="play" onClick={handlePlay}>
			      <img src={process.env.PUBLIC_URL + "./play.png"} alt="Play" />
			    </button>
			  )}

			  {youtubeIsPlaying && (
			    <button id="pause" onClick={handlePause}>
			      <img src={process.env.PUBLIC_URL + "./pause.png"} alt="Pause" />
			    </button>
			  )}

			  <button id="next" onClick={() => handleNext(youtubeVideoIds)}>
			    <img src={process.env.PUBLIC_URL + "./next.png"} alt="Next" />
			  </button>
			</div>
		</div>
	);
};
export default YoutubePlayer;
