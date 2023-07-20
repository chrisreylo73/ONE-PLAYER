import React from "react";
import YoutubePlaylistsCon from "./YoutubePlaylistsCon";
import SpotifyPlaylistsCon from "./SpotifyPlaylistsCon";

const ControlPanel = ({ spotifyPlaylists, spotifyHandlePlaylistSelect, youtubePlaylists, youtubeHandlePlaylistSelect, setSpotifySelectedPlaylist, setCode }) => {
	return (
		<div className="controlPanel">
			<SpotifyPlaylistsCon spotifyPlaylists={spotifyPlaylists} spotifyHandlePlaylistSelect={spotifyHandlePlaylistSelect} setSpotifySelectedPlaylist={setSpotifySelectedPlaylist} setCode={setCode} />
			<YoutubePlaylistsCon youtubePlaylists={youtubePlaylists} youtubeHandlePlaylistSelect={youtubeHandlePlaylistSelect} />
		</div>
	);
};

export default ControlPanel;
