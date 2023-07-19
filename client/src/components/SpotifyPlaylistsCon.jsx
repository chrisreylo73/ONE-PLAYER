import Playlist from "./SpotifyPlaylist";
// import Login from "../Login";
const SpotifyPlaylistsCon = ({ spotifyPlaylists, spotifyHandlePlaylistSelect }) => {
	return (
		<div className="Spotify-Playlists-con">
			<div className="Spotify-Playlists-header">
				<h3>SPOTIFY PLAYLISTS</h3>
				<button>Login to Spotify</button>
				{/* <Login /> */}
			</div>
			<div className="Spotify-Playlists">
				{spotifyPlaylists.map((spotifyPlaylist) => (
					<Playlist key={spotifyPlaylist.id} title={spotifyPlaylist.name} handleClick={() => spotifyHandlePlaylistSelect(spotifyPlaylist)} />
				))}
			</div>
		</div>
	);
};

export default SpotifyPlaylistsCon;
