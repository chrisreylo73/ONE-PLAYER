import Playlist from "./SpotifyPlaylist";
import { useState } from "react";
// import Login from "../Login";
const SpotifyPlaylistsCon = ({ spotifyPlaylists, spotifyHandlePlaylistSelect }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className="Spotify-Playlists-con">
			<div className="Spotify-Playlists-header">
				<h3>SPOTIFY PLAYLISTS</h3>
				<button>Login to Spotify</button>
				{/* <Login /> */}
			</div>
			<div className={`Spotify-Playlists ${isHovered ? "hovered" : ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				{spotifyPlaylists.map((spotifyPlaylist) => (
					<Playlist key={spotifyPlaylist.id} title={spotifyPlaylist.name} handleClick={() => spotifyHandlePlaylistSelect(spotifyPlaylist)} />
				))}
			</div>
		</div>
	);
};

export default SpotifyPlaylistsCon;
