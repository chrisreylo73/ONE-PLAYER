import YoutubePlaylist from "./YoutubePlaylist";

const YoutubePlaylistsCon = ({ youtubePlaylists, youtubeHandlePlaylistSelect }) => {
	return (
		<div className="Youtube-Playlists-con">
			<div className="Youtube-Playlists-header">
				<h3>YOUTUBE PLAYLISTS</h3>
				<button>Login to Youtube</button>
			</div>
			<div className="Youtube-Playlists">
				{youtubePlaylists.map((youtubePlaylist) => (
					<YoutubePlaylist key={youtubePlaylist.id} title={youtubePlaylist.playlistTitle} handleClick={() => youtubeHandlePlaylistSelect(youtubePlaylist)} />
				))}
			</div>
		</div>
	);
};

export default YoutubePlaylistsCon;
