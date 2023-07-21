import { useState } from "react";

const SpotifySong = ({ spotifyChooseTrack, track, setIsSpotifySong }) => {
	const [isHovered, setIsHovered] = useState(false);
	const minutes = Math.floor(track.duration_ms / 60000);
	const seconds = Math.floor((track.duration_ms % 60000) / 1000);
	const formattedLength = track.duration_ms ? `${minutes}:${seconds.toString().padStart(2, "0")}` : "length?";

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	function handlePlay() {
		setIsSpotifySong(true);
		spotifyChooseTrack(track);
	}
	return (
		<div className={`song ${isHovered ? "hovered" : ""}`} onClick={handlePlay} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<img className="album-cover" src={track.album.images[0].url} alt="Album Cover" />
			<div className="songInfo">
				<p id="title">{track.name}</p>
				<p id="artist">{track.artists[0].name}</p>
			</div>
			<p>{formattedLength}</p>
		</div>
	);
};

SpotifySong.defaultProps = {
	title: "Title?",
	album: "Album?",
	length: "Length?",
};

export default SpotifySong;
// const albumCover = track.album.images[0].url;
// const title = track.name;
// const artist = track.artists[0].name;
// const album = track.album.name;
// const length = track.duration_ms;
