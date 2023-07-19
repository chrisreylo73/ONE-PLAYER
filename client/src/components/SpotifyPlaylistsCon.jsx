import SpotifyPlaylist from "./SpotifyPlaylist";
import { useState } from "react";
// import Login from "../Login";
const SpotifyPlaylistsCon = ({ spotifyPlaylists, spotifyHandlePlaylistSelect, setSpotifySelectedPlaylist }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [selectedPlaylist, setSelectedPlaylist] = useState(null);

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
					<SpotifyPlaylist
						key={spotifyPlaylist.id}
						title={spotifyPlaylist.name}
						isSelected={spotifyPlaylist === selectedPlaylist}
						handleClick={() => {
							spotifyHandlePlaylistSelect(spotifyPlaylist);
							setSelectedPlaylist(spotifyPlaylist); // Set the selected playlist
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default SpotifyPlaylistsCon;
