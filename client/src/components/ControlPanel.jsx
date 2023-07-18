import React from "react";
import YoutubePlaylistsCon from "./YoutubePlaylistsCon";
import SpotifyPlaylistsCon from "./SpotifyPlaylistsCon";

const ControlPanel = ({ spotifyPlaylists, spotifyHandlePlaylistSelect, youtubePlaylists, youtubeHandlePlaylistSelect }) => {
	return (
		<div className="controlPanel">
			<SpotifyPlaylistsCon spotifyPlaylists={spotifyPlaylists} spotifyHandlePlaylistSelect={spotifyHandlePlaylistSelect} />
			<YoutubePlaylistsCon youtubePlaylists={youtubePlaylists} youtubeHandlePlaylistSelect={youtubeHandlePlaylistSelect} />
		</div>
	);
};

export default ControlPanel;
