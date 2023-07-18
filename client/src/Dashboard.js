import { useState, useEffect } from "react";

import useAuth from "./useAuth";
import Player from "./Player";
// import TrackSearchResult from "./TrackSearchResult";
// import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
// import axios from "axios";
import Tracks from "./components/Tracks";
import ControlPanel from "./components/ControlPanel";
import YoutubePlayer from "./components/YoutubePlayer";
import SpotifyPlayer from "./components/SpotifyPlayer";

const API_BASE_URL = "https://api.spotify.com/v1";
const spotifyApi = new SpotifyWebApi({
	clientId: "8b945ef10ea24755b83ac50cede405a0",
});

export default function Dashboard({ code }) {
	/**-----------------------------------------------------------------------------------------------------------------------
	 *                                                    SPOTIFY
	 *-----------------------------------------------------------------------------------------------------------------------**/

	// const [search, setSearch] = useState("");
	// const [searchResults, setSearchResults] = useState([]);
	// const [lyrics, setLyrics] = useState("");
	const accessToken = useAuth(code);
	const [currentTrack, setCurrentTrack] = useState();
	const [platform, setPlatform] = useState(null);
	const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
	const [spotifySelectedPlaylist, setSpotifySelectedPlaylist] = useState(null);
	const [spotifyPlaylistTracks, setSpotifyPlaylistTracks] = useState([]);

	const [youtubePlaylistTracks, setYoutubePlaylistTracks] = useState([]);
	const [youtubeSelectedPlaylist, setYouTubeSelectedPlaylist] = useState(null);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (accessToken) {
			fetchPlaylists();
		}
	}, [accessToken]);

	const fetchPlaylists = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/me/playlists`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setSpotifyPlaylists(data.items);
			} else {
				console.log("Error:", response.status);
			}
		} catch (error) {
			console.log("Error:", error);
		}
	};

	const fetchPlaylistTracks = async (playlistId) => {
		try {
			const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/tracks`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setSpotifyPlaylistTracks(data.items);
			} else {
				console.log("Error:", response.status);
			}
		} catch (error) {
			console.log("Error:", error);
		}
	};
	const fetchYoutubePlaylistTracks = async (playlistId) => {
		setYoutubePlaylistTracks(youtubePlaylists[playlistId].songs);
	};

	const spotifyHandlePlaylistSelect = async (playlist) => {
		setSpotifySelectedPlaylist(playlist);
		console.log("HI");
		await fetchPlaylistTracks(playlist.id);
	};

	const youtubeHandlePlaylistSelect = async (playlist) => {
		setYouTubeSelectedPlaylist(playlist);
		console.log("hello");
		await fetchYoutubePlaylistTracks(playlist.id);
	};
	const spotifyDeselectPlaylist = () => {};

	const spotifyChooseTrack = (track) => {
		setCurrentTrack(track);
		// setSearch("");
		// setLyrics("");
	};

	/**-----------------------------------------------------------------------------------------------------------------------
	 *                                                    YOUTUBE
	 *-----------------------------------------------------------------------------------------------------------------------**/
	const [player, setPlayer] = useState(null);
	const [youtubeCurrentIndex, setYoutubeCurrentIndex] = useState(0);
	const [youtubeIsPlaying, setYoutubeIsPlaying] = useState(false);

	const handlePlayerReady = (event) => {
		setPlayer(event.target);
		// setYoutubeCurrentIndex(0);
		console.log("Player Ready:", event.target);
	};
	const youtubeChooseTrack = (songId) => {
		console.log(songId);
		setYoutubeIsPlaying(true);
		setYoutubeCurrentIndex(songId);
	};

	const handlePlay = () => {
		setYoutubeIsPlaying(true);
		player.playVideo();
	};

	const handlePause = () => {
		setYoutubeIsPlaying(false);
		player.pauseVideo();
	};

	const handleNext = (youtubePlaylist) => {
		setYoutubeCurrentIndex((prevIndex) => (prevIndex + 1) % youtubePlaylist.length);
	};

	const handlePrevious = (youtubePlaylist) => {
		setYoutubeCurrentIndex((prevIndex) => {
			const newIndex = prevIndex - 1;
			return newIndex < 0 ? youtubePlaylist.length - 1 : newIndex;
		});
	};

	const handlePlaylistEnd = () => {
		setYoutubeCurrentIndex(0);
	};

	const youtubePlaylists = [
		{
			playlistTitle: "Brett Emmons",
			id: 0,
			songs: [
				{ name: "Bull and the Matador", artist: "Brett Emmons", url: "ZWVGr7cQZ_Y", songId: 0 },
				{ name: "Shambles", artist: "Brett Emmons", url: "Ti4blSWS6bY", songId: 1 },
				{ name: "Heavy", artist: "Brett Emmons", url: "8puqbXK3k-w", songId: 2 },
			],
		},
		{
			playlistTitle: "J.Cole",
			id: 1,
			songs: [
				{ name: "i'm a Fool", artist: "J.cole", url: "mgRzTTMLfEs", songId: 0 },
				{ name: "Can I Holla At you", artist: "J.cole", url: "v9ejF5AumDk", songId: 1 },
				{ name: "It Won't Be Long", artist: "J.cole", url: "jNBXU26tRDY", songId: 2 },
			],
		},
		// { name: "Live Songs", songs: ["ZWVGr7cQZ_Y", "Ti4blSWS6bY", "8puqbXK3k-w"] },
	];

	const spotifyTrackURIs = spotifyPlaylistTracks.map((playlistTrack) => playlistTrack.track.uri);
	console.log(spotifyTrackURIs);

	return (
		<div>
			<Tracks spotifySelectedPlaylist={spotifySelectedPlaylist} spotifyPlaylistTracks={spotifyPlaylistTracks} spotifyChooseTrack={spotifyChooseTrack} youtubeSelectedPlaylist={youtubeSelectedPlaylist} youtubePlaylistTracks={youtubePlaylistTracks} youtubeChooseTrack={youtubeChooseTrack} />
			<ControlPanel spotifyPlaylists={spotifyPlaylists} youtubePlaylists={youtubePlaylists} spotifyHandlePlaylistSelect={spotifyHandlePlaylistSelect} youtubeHandlePlaylistSelect={youtubeHandlePlaylistSelect} />
			{youtubeSelectedPlaylist && <YoutubePlayer youtubePlaylist={youtubePlaylists[youtubeSelectedPlaylist.id]} handlePrevious={handlePrevious} handleNext={handleNext} handlePlay={handlePlay} handlePause={handlePause} handlePlaylistEnd={handlePlaylistEnd} youtubeCurrentIndex={youtubeCurrentIndex} youtubeIsPlaying={youtubeIsPlaying} handlePlayerReady={handlePlayerReady} />}
			<div className="Spotify-Player">
				{/* <SpotifyPlayer accessToken={accessToken} currentTrack={currentTrack}></SpotifyPlayer> */}
				<Player accessToken={accessToken} trackUri={currentTrack?.uri} spotifyTrackURIs={spotifyTrackURIs} />
			</div>
		</div>
	);
}

{
	/* <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={(e) => setSearch(e.target.value)} /> */
}
{
	/* <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				{searchResults.map((track) => (
					<TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
				))}
				{searchResults.length === 0 && (
					<div className="text-center" style={{ whiteSpace: "pre" }}>
						{lyrics}
					</div>
				)}
			</div> */
}
