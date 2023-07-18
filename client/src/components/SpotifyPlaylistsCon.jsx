import Playlist from "./SpotifyPlaylist";

const SpotifyPlaylistsCon = ({ spotifyPlaylists, spotifyHandlePlaylistSelect }) => {
	return (
		<div className="Spotify-Playlists">
			<h3>Spotify Playlists</h3>
			<div className="playlists">
				{spotifyPlaylists.map((spotifyPlaylist) => (
					<Playlist key={spotifyPlaylist.id} title={spotifyPlaylist.name} handleClick={() => spotifyHandlePlaylistSelect(spotifyPlaylist)} />
				))}
			</div>
		</div>
	);
};

export default SpotifyPlaylistsCon;
