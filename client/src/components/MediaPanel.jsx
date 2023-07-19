import React from "react";
import Player from "./Player";

const MediaPanel = ({ accessToken, trackUri, playlistUri }) => {
	if (!accessToken) return <div className="mediaPanel"></div>;
	return (
		<div className="mediaPanel">
			{/* {youtubeSelectedPlaylist && <YoutubePlayer youtubePlaylist={youtubePlaylists[youtubeSelectedPlaylist.id]} handlePrevious={handlePrevious} handleNext={handleNext} handlePlay={handlePlay} handlePause={handlePause} handlePlaylistEnd={handlePlaylistEnd} youtubeCurrentIndex={youtubeCurrentIndex} youtubeIsPlaying={youtubeIsPlaying} handlePlayerReady={handlePlayerReady} />} */}
			<div className="disk"></div>
			<div className="Spotify-Player">
				<Player accessToken={accessToken} trackUri={trackUri} playlistUri={playlistUri} />
			</div>
		</div>
	);
};

export default MediaPanel;
