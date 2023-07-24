import YoutubePlaylist from "./YoutubePlaylist";
import { useState } from "react";

const YoutubePlaylistsCon = ({ youtubePlaylists, youtubeHandlePlaylistSelect}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [selectedPlaylist, setSelectedPlaylist] = useState(null);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};



	return (
		<div className={`Youtube-Playlists-con ${isHovered ? "hovered" : ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="Youtube-Playlists-header">
				<h3>YOUTUBE PLAYLISTS</h3>
			</div>
			<div className="Youtube-Playlists">
				{youtubePlaylists.map((youtubePlaylist) => (
					<YoutubePlaylist
						key={youtubePlaylist.id}
						title={youtubePlaylist.snippet.title}
						isSelected={youtubePlaylist?.id === selectedPlaylist?.id}
						handleClick={() => {
							youtubeHandlePlaylistSelect(youtubePlaylist);
							setSelectedPlaylist(youtubePlaylist);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default YoutubePlaylistsCon;
