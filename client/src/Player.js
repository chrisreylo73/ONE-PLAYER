import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri, spotifyTrackURIs }) {
	const [play, setPlay] = useState(false);

	useEffect(() => setPlay(true), [trackUri]);

	if (!accessToken) return null;
	return (
		<SpotifyPlayer
			styles={{
				activeColor: "#fff",
				bgColor: "#242424",
				color: "#fff",
				loaderColor: "#fff",
				sliderColor: "#1cb954",
				trackArtistColor: "#ccc",
				trackNameColor: "#fff",
			}}
			inlineVolume="false"
			layout="compact"
			token={accessToken}
			showSaveIcon
			callback={(state) => {
				if (!state.isPlaying) setPlay(false);
			}}
			next={"Next"}
			play={play}
			uris={trackUri ? [trackUri] : [...spotifyTrackURIs]}
		/>
	);
}
