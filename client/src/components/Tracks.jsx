import SpotifySong from "./SpotifySong";
import YoutubeSong from "./YoutubeSong";
import { useState } from "react";

const Tracks = ({ spotifySelectedPlaylist, youtubeSelectedPlaylist, youtubePlaylistTracks, youtubeChooseTrack, spotifyPlaylistTracks, spotifyChooseTrack, setIsSpotifySong }) => {
	const [isHovered, setIsHovered] = useState(false);
	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	// console.log(youtubeSelectedPlaylist)
	// console.log(youtubePlaylistTracks)
	if (spotifySelectedPlaylist == null && youtubeSelectedPlaylist == null) {
		return <div className="tracks"></div>;
	} else if (spotifySelectedPlaylist == null) {
		return (
			<div className="tracks">
				<div className="playlistHeaders-youtube">
					<h3 style={{ textTransform: "uppercase" }}>{youtubeSelectedPlaylist.snippet.title}</h3>
				</div>
				{youtubePlaylistTracks.map((youtubePlaylistTrack) => (
					<YoutubeSong youtubeChooseTrack={youtubeChooseTrack} track={youtubePlaylistTrack} setIsSpotifySong={setIsSpotifySong} />
				))}
			</div>
		);
	} else if (youtubeSelectedPlaylist == null) {
		return (
			<div className="tracks">
				<div className="playlistHeaders-spotify">
					<h3 style={{ textTransform: "uppercase" }}>{spotifySelectedPlaylist.name}</h3>
				</div>
				{spotifyPlaylistTracks.map((playlistTrack) => {
					const track = playlistTrack.track;
					return <SpotifySong key={track.id} spotifyChooseTrack={spotifyChooseTrack} track={track} setIsSpotifySong={setIsSpotifySong} />;
				})}
			</div>
		);
	} else {
		return (
			<div className="tracks">
				<div className="playlistHeaders-spotify">
					<h3 style={{ textTransform: "uppercase" }}>{spotifySelectedPlaylist.name}</h3>
				</div>
				{spotifyPlaylistTracks.map((playlistTrack) => {
					const track = playlistTrack.track;
					return <SpotifySong spotifyChooseTrack={spotifyChooseTrack} track={track} setIsSpotifySong={setIsSpotifySong} />;
				})}

				<div className="playlistHeaders-youtube">
					<h3 style={{ textTransform: "uppercase" }}>{youtubeSelectedPlaylist.snippet.title}</h3>
				</div>
				{youtubePlaylistTracks.map((youtubePlaylistTrack) => (
					<YoutubeSong youtubeChooseTrack={youtubeChooseTrack} track={youtubePlaylistTrack} setIsSpotifySong={setIsSpotifySong} />
				))}
			</div>
		);
	}
};

export default Tracks;
