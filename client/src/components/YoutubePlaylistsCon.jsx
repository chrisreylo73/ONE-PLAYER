import YoutubePlaylist from "./YoutubePlaylist";

const YoutubePlaylistsCon = ({ youtubePlaylists, youtubeHandlePlaylistSelect }) => {
	// console.log(youtubePlaylists[1].id);
	return (
		<div className="Youtube-Playlists">
			<h3>Youtube Playlists</h3>
			<div className="playlists">
				{youtubePlaylists.map((youtubePlaylist) => (
					<YoutubePlaylist key={youtubePlaylist.id} title={youtubePlaylist.playlistTitle} handleClick={() => youtubeHandlePlaylistSelect(youtubePlaylist)} />
				))}
			</div>
		</div>
	);
};

export default YoutubePlaylistsCon;
