import SpotifyPlaylist from "./SpotifyPlaylist";
import { useState } from "react";
const SpotifyPlaylistsCon = ({ spotifyPlaylists, spotifyHandlePlaylistSelect, setSpotifySelectedPlaylist, setCode }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [selectedPlaylist, setSelectedPlaylist] = useState(null);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className={`Spotify-Playlists-con ${isHovered ? "hovered" : ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="Spotify-Playlists-header">
				<h3>SPOTIFY PLAYLISTS</h3>
			</div>
			<div className="Spotify-Playlists">
				{spotifyPlaylists.map((spotifyPlaylist) => (
					<SpotifyPlaylist
						key={spotifyPlaylist.id}
						title={spotifyPlaylist.name}
						isSelected={spotifyPlaylist === selectedPlaylist}
						handleClick={() => {
							spotifyHandlePlaylistSelect(spotifyPlaylist);
							setSelectedPlaylist(spotifyPlaylist);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default SpotifyPlaylistsCon;
