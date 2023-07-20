import { useState, useEffect } from "react";

import useAuth from "./components/useAuth";
import Player from "./components/Player";
import SpotifyWebApi from "spotify-web-api-node";
import Tracks from "./components/Tracks";
import ControlPanel from "./components/ControlPanel";
import MediaPanel from "./components/MediaPanel";
import axios from "axios";
import Login from "./Login";

const API_BASE_URL = "https://api.spotify.com/v1";

const spotifyApi = new SpotifyWebApi({
	clientId: "8b945ef10ea24755b83ac50cede405a0",
});

export default function Dashboard() {
	/**-----------------------------------------------------------------------------------------------------------------------
	 *                                                    SPOTIFY
	 *-----------------------------------------------------------------------------------------------------------------------**/
	const [code, setCode] = useState(null);
	// const accessToken = useAuth(code);
	const [currentTrack, setCurrentTrack] = useState();
	const [platform, setPlatform] = useState(null);
	const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
	const [spotifySelectedPlaylist, setSpotifySelectedPlaylist] = useState(null);
	const [spotifyPlaylistTracks, setSpotifyPlaylistTracks] = useState([]);

	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	const CLIENT_ID = "b96044a084a542c691fe9b0eca9684de";
	const REDIRECT_URI = "http://localhost:3000";
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "code";
	const SCOPES = "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
	const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
	// const code = new URLSearchParams(window.location.search).get("code");
	// setCode(new URLSearchParams(window.location.search).get("code"));
	useEffect(() => {
		if (new URLSearchParams(window.location.search).get("code") === null) {
			window.location.href = AUTH_URL;
		}
	}, []);
	useEffect(() => {
		console.log("hey");
		if (code !== null) {
			axios
				.post("http://localhost:3001/login", {
					code,
				})
				.then((res) => {
					setAccessToken(res.data.accessToken);
					setRefreshToken(res.data.refreshToken);
					setExpiresIn(res.data.expiresIn);
					window.history.pushState({}, null, "/");
				})
				.catch(() => {
					window.location = "/";
				});
		}
	}, [code]);

	useEffect(() => {
		if (!refreshToken || !expiresIn) return;
		const interval = setInterval(() => {
			axios
				.post("http://localhost:3001/refresh", {
					refreshToken,
				})
				.then((res) => {
					setAccessToken(res.data.accessToken);
					setExpiresIn(res.data.expiresIn);
				})
				.catch(() => {
					window.location = "/";
				});
		}, (expiresIn - 60) * 1000);

		return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
		fetchPlaylists();
	}, [accessToken]);

	const spotifyLogin = () => {
		// console.log(code);
		setCode(new URLSearchParams(window.location.search).get("code"));
		// console.log(code);
	};

	const fetchPlaylists = async () => {
		try {
			let playlists = [];
			let nextUrl = `${API_BASE_URL}/me/playlists`;

			while (nextUrl) {
				const response = await fetch(nextUrl, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (response.ok) {
					const data = await response.json();
					playlists = playlists.concat(data.items);
					nextUrl = data.next; // Get the URL for the next page of playlists
				} else {
					console.log("Error:", response.status);
					break; // Stop fetching if there's an error
				}
			}

			setSpotifyPlaylists(playlists);
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

	const spotifyHandlePlaylistSelect = async (playlist) => {
		setSpotifySelectedPlaylist(playlist);
		await fetchPlaylistTracks(playlist.id);
	};

	const spotifyDeselectPlaylist = () => {
		console.log("Deselect");
		setSpotifySelectedPlaylist(null);
	};

	const spotifyChooseTrack = (track) => {
		setCurrentTrack(track);
	};

	/**-----------------------------------------------------------------------------------------------------------------------
	 *                                                    YOUTUBE
	 *-----------------------------------------------------------------------------------------------------------------------**/
	const [player, setPlayer] = useState(null);
	const [youtubeCurrentIndex, setYoutubeCurrentIndex] = useState(0);
	const [youtubeIsPlaying, setYoutubeIsPlaying] = useState(false);
	const [youtubePlaylistTracks, setYoutubePlaylistTracks] = useState([]);
	const [youtubeSelectedPlaylist, setYouTubeSelectedPlaylist] = useState(null);

	const fetchYoutubePlaylistTracks = async (playlistId) => {
		setYoutubePlaylistTracks(youtubePlaylists[playlistId].songs);
	};
	const youtubeHandlePlaylistSelect = async (playlist) => {
		setYouTubeSelectedPlaylist(playlist);
		console.log("hello");
		await fetchYoutubePlaylistTracks(playlist.id);
	};
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
	const playlistAlbumCovers = spotifyPlaylistTracks.map((playlistTrack) => playlistTrack.track.album.images[0].url);
	// console.log(playlistAlbumCovers);
	// console.log(currentTrack);

	return (
		<div className="dashboard">
			<ControlPanel setCode={setCode} spotifyPlaylists={spotifyPlaylists} youtubePlaylists={youtubePlaylists} spotifyHandlePlaylistSelect={spotifyHandlePlaylistSelect} youtubeHandlePlaylistSelect={youtubeHandlePlaylistSelect} setSpotifySelectedPlaylist={setSpotifySelectedPlaylist} />
			<MediaPanel accessToken={accessToken} trackUri={currentTrack?.uri} playlistUri={spotifyTrackURIs} playlistAlbumCovers={playlistAlbumCovers} />
			<Tracks spotifySelectedPlaylist={spotifySelectedPlaylist} spotifyPlaylistTracks={spotifyPlaylistTracks} spotifyChooseTrack={spotifyChooseTrack} youtubeSelectedPlaylist={youtubeSelectedPlaylist} youtubePlaylistTracks={youtubePlaylistTracks} youtubeChooseTrack={youtubeChooseTrack} />

			{/* {youtubeSelectedPlaylist && <YoutubePlayer youtubePlaylist={youtubePlaylists[youtubeSelectedPlaylist.id]} handlePrevious={handlePrevious} handleNext={handleNext} handlePlay={handlePlay} handlePause={handlePause} handlePlaylistEnd={handlePlaylistEnd} youtubeCurrentIndex={youtubeCurrentIndex} youtubeIsPlaying={youtubeIsPlaying} handlePlayerReady={handlePlayerReady} />} */}

			{/* <div className="Spotify-Player"> */}
			{/* <SpotifyPlayer accessToken={accessToken} currentTrack={currentTrack}></SpotifyPlayer> */}

			{/* </div> */}
		</div>
	);
}
