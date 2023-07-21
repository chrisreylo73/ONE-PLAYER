import React from "react";
import Player from "./Player";
import { useState, useEffect } from "react";
import YoutubePlayer from "./YoutubePlayer";
const MediaPanel = ({ accessToken, trackUri, playlistUri, playlistAlbumCovers, isSpotifySong, youtubeSelectedPlaylist, youtubePlaylist, handlePrevious, handleNext, handlePlay, handlePause, handlePlaylistEnd, youtubeCurrentIndex, youtubeIsPlaying, handlePlayerReady }) => {
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [currentAlbumCover, setCurrentAlbumCover] = useState();

	// Access the image URL using the currentSongIndex
	useEffect(() => {
		setCurrentAlbumCover(playlistAlbumCovers[currentSongIndex]);
	}, [currentSongIndex]);

	if (!accessToken) return <div className="mediaPanel"></div>;

	return (
		<div className="mediaPanel">
			{isSpotifySong ? (
				<>
					{currentAlbumCover ? (
						<img src={currentAlbumCover} alt="Album Cover" className="albumCover" />
					) : (
						<>
							<img src="https://i.scdn.co/image/ab67616d0000b273741a77d739f166d77fbfb53e" alt="Album Cover" className="albumCover" />
							{/* <div className="whiteCircle"></div> */}
						</>
					)}
					<div className="Spotify-Player">
						<Player accessToken={accessToken} trackUri={trackUri} playlistUri={playlistUri} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
					</div>
				</>
			) : (
				youtubeSelectedPlaylist && <YoutubePlayer youtubePlaylist={youtubePlaylist} handlePrevious={handlePrevious} handleNext={handleNext} handlePlay={handlePlay} handlePause={handlePause} handlePlaylistEnd={handlePlaylistEnd} youtubeCurrentIndex={youtubeCurrentIndex} youtubeIsPlaying={youtubeIsPlaying} handlePlayerReady={handlePlayerReady} />
			)}
		</div>
	);
};

export default MediaPanel;
