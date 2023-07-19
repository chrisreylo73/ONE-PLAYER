import React from "react";
import Player from "./Player";
import { useState, useEffect } from "react";

const MediaPanel = ({ accessToken, trackUri, playlistUri, playlistAlbumCovers }) => {
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [currentAlbumCover, setCurrentAlbumCover] = useState();

	// Access the image URL using the currentSongIndex
	useEffect(() => {
		setCurrentAlbumCover(playlistAlbumCovers[currentSongIndex]);
	}, [currentSongIndex, playlistAlbumCovers]);

	if (!accessToken) return <div className="mediaPanel"></div>;

	return (
		<div className="mediaPanel">
			{currentAlbumCover && <img src={currentAlbumCover} alt="Album Cover" className="albumCover" />}
			<div className="Spotify-Player">
				<Player accessToken={accessToken} trackUri={trackUri} playlistUri={playlistUri} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
			</div>
		</div>
	);
};

export default MediaPanel;
