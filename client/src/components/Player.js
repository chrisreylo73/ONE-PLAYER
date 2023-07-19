import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri, playlistUri, currentSongIndex, setCurrentSongIndex }) {
	const [play, setPlay] = useState(false);
	// const [currentSongIndex, setCurrentSongIndex] = useState(0); // Add state for the current song index
	// const [currentSongCover, setCurrentSongCover] = useState(trackUri); // Add state for the current
	useEffect(() => {
		setPlay(true);
		const newIndex = playlistUri.findIndex((uri) => uri === trackUri);
		setCurrentSongIndex(newIndex);
		console.log(newIndex); // Find the new index based on the provided trackUri
	}, [trackUri]);

	// const handleSongChange = (cover) => {
	// 	setCurrentSongCover(cover);
	// };
	console.log(trackUri);
	// activeColor: string;
	//   altColor: string;
	//   bgColor: string;
	//   color: string;
	//   errorColor: string;
	//   height: number;
	//   loaderColor: string;
	//   loaderSize: number | string;
	//   sliderColor: string;
	//   sliderHandleBorderRadius: number | string;
	//   sliderHandleColor: string;
	//   sliderHeight: number;
	//   sliderTrackBorderRadius: number | string;
	//   sliderTrackColor: string;
	//   trackArtistColor: string;
	//   trackNameColor: string;
	return (
		<>
			{/* {currentSongCover && <img src={currentSongCover} alt="Current Track" />} */}
			<SpotifyPlayer
				styles={{
					loaderSize: 90,
					height: 60,
					activeColor: "#202528",
					bgColor: "#202528",
					color: "#fff",
					loaderColor: "#0011ff",
					sliderColor: "#0011ff",
					trackArtistColor: "#ccc",
					trackNameColor: "#fff",
					sliderHandleColor: "#ffffff",
					sliderHeight: 5,
					sliderTrackColor: "#191919",
					sliderTrackBorderRadius: 10,
					sliderHandleBorderRadius: 10,
				}}
				token={accessToken}
				// showSaveIcon
				callback={(state) => {
					if (!state.isPlaying) setPlay(false);
					const currentSongIndex = playlistUri.findIndex((uri) => uri === state.track?.uri);
					setCurrentSongIndex(currentSongIndex);
					// console.log(state.track);
				}}
				// magnifySliderOnHover={true}
				offset={currentSongIndex}
				// shuffle={true}
				play={play}
				uris={playlistUri}
			/>
		</>
	);
}
