import React from "react";
import YoutubePlaylistsCon from "./YoutubePlaylistsCon";
import SpotifyPlaylistsCon from "./SpotifyPlaylistsCon";

const ControlPanel = ({ spotifyPlaylists, spotifyHandlePlaylistSelect, youtubePlaylists, youtubeHandlePlaylistSelect, setSpotifySelectedPlaylist, setYouTubeSelectedPlaylist }) => {
	return (
		<div className="controlPanel">
			<SpotifyPlaylistsCon spotifyPlaylists={spotifyPlaylists} spotifyHandlePlaylistSelect={spotifyHandlePlaylistSelect} setSpotifySelectedPlaylist={setSpotifySelectedPlaylist}/>
			<YoutubePlaylistsCon youtubePlaylists={youtubePlaylists} youtubeHandlePlaylistSelect={youtubeHandlePlaylistSelect} setYouTubeSelectedPlaylist={setYouTubeSelectedPlaylist}/>
		</div>
	);
};

export default ControlPanel;
