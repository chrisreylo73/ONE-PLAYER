import { useState, useEffect } from "react";

import SpotifyPlayer from "react-spotify-web-playback";

const SpotifyPlayback = ({ accessToken, trackUri, playlistUri, currentSongIndex, setCurrentSongIndex }) => {
	const [play, setPlay] = useState(false);
	useEffect(() => {
		setPlay(true);
		const newIndex = playlistUri.findIndex((uri) => uri === trackUri);
		setCurrentSongIndex(newIndex);
		console.log(newIndex); 
	}, [trackUri]);
	console.log(trackUri);
	return (
		<>
			<SpotifyPlayer
				styles={{
					loaderSize: 90,
					height: 60,
					activeColor: "#ffffff",
					bgColor: "#202528",
					color: "#ffffff",
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
				showSaveIcon
				callback={(state) => {
					if (!state.isPlaying) setPlay(false);
					const currentSongIndex = playlistUri.findIndex((uri) => uri === state.track?.uri);
					setCurrentSongIndex(currentSongIndex);
				}}
				offset={currentSongIndex}
				play={play}
				uris={playlistUri}
			/>
		</>
	);
}
export default SpotifyPlayback