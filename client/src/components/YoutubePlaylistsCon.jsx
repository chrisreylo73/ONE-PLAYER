import YoutubePlaylist from "./YoutubePlaylist";
import { useState } from "react";

const YoutubePlaylistsCon = ({ youtubePlaylists, youtubeHandlePlaylistSelect }) => {
	const [selectedPlaylist, setSelectedPlaylist] = useState(null);

	return (
		<div className="Youtube-Playlists-con">
			<div className="Youtube-Playlists-header">
				<h3>YOUTUBE PLAYLISTS</h3>
				<button>Login to Youtube</button>
			</div>
			<div className="Youtube-Playlists">
				{youtubePlaylists.map((youtubePlaylist) => (
					<YoutubePlaylist
						key={youtubePlaylist.id}
						title={youtubePlaylist.playlistTitle}
						isSelected={youtubePlaylist.id === (selectedPlaylist && selectedPlaylist.id)}
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
