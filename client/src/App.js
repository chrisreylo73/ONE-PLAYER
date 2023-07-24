import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SpotifyWebApi from "spotify-web-api-node";
import Tracks from "./components/Tracks";
import ControlPanel from "./components/ControlPanel";
import MediaPanel from "./components/MediaPanel";
import axios from "axios";
import "./App.css";
// require("dotenv").config();

const API_BASE_URL = "https://api.spotify.com/v1";

const spotifyApi = new SpotifyWebApi({
	clientId: "8b945ef10ea24755b83ac50cede405a0",
});

export default function App() {
	/**-----------------------------------------------------------------------------------------------------------------------
	 *                                                    SPOTIFY
	 *-----------------------------------------------------------------------------------------------------------------------**/
	const [code, setCode] = useState(null);
	const [currentTrack, setCurrentTrack] = useState();
	const [isSpotifySong, setIsSpotifySong] = useState(false);
	const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
	const [spotifySelectedPlaylist, setSpotifySelectedPlaylist] = useState(null);
	const [spotifyPlaylistTracks, setSpotifyPlaylistTracks] = useState([]);

	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	const spotifyTrackURIs = spotifyPlaylistTracks.map((playlistTrack) => playlistTrack.track.uri);
	const playlistAlbumCovers = spotifyPlaylistTracks.map((playlistTrack) => playlistTrack.track.album.images[0].url);

	const AUTH_URL = `${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${process.env.REACT_APP_SCOPES}`;
	
	useEffect(() => {
		if (new URLSearchParams(window.location.search).get("code") === null) {
			window.location.href = AUTH_URL;
		}
		if (new URLSearchParams(window.location.search).get("code") !== null){
			setCode(new URLSearchParams(window.location.search).get("code"));
		}
	}, []);

	useEffect(() => {
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
					nextUrl = data.next; 
				} else {
					console.log("Error:", response.status);
					break; 
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

	const spotifyChooseTrack = (track) => {
		setCurrentTrack(track);
	};

	/**-----------------------------------------------------------------------------------------------------------------------
	 *                                                    YOUTUBE
	 *-----------------------------------------------------------------------------------------------------------------------**/
	const [youtubePlayer, setYoutubePlayer] = useState(null);
	const [youtubeCurrentIndex, setYoutubeCurrentIndex] = useState(0);
	const [youtubeIsPlaying, setYoutubeIsPlaying] = useState(true);
	const [youtubePlaylistTracks, setYoutubePlaylistTracks] = useState([]);
	const [youtubeSelectedPlaylist, setYouTubeSelectedPlaylist] = useState(null);
	const [youtubePlaylists, setYoutubePlaylists] = useState([]);
	const youtubeVideoIds = youtubePlaylistTracks.map((playlistTrack) => playlistTrack.snippet.resourceId.videoId);
	
	useEffect(() => {
		// const apiKey = "AIzaSyCr8ZkvKo6zU5EmLhoYKdRy2FNhoVKTc8s";
		// const channelId = "UCIFkCqVZxZaH6Ng5OwCEDcQ";
		const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
		axios
		.get(apiUrl)
		.then((response) => {
			// console.log(response.data.items);
			setYoutubePlaylists(response.data.items);
		})
		.catch((error) => {
			console.error("Error fetching playlists:", error);
		});
	}, []);

	const fetchPlaylistVideos = (playlistId) => {
		// const apiKey = "AIzaSyCr8ZkvKo6zU5EmLhoYKdRy2FNhoVKTc8s";
		const videosUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=200&playlistId=${playlistId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
		axios.get(videosUrl)
		.then((response) => {
			// console.log(response.data.items);
			setYoutubePlaylistTracks(response.data.items);
		})
		.catch((error) => {
			console.error("Error fetching playlists:", error);
		});
	 };
	const youtubeHandlePlaylistSelect = async (playlist) => {
		setYouTubeSelectedPlaylist(playlist);
		console.log("hello");
		await fetchPlaylistVideos(playlist.id);
	};
	
	const handlePlayerReady = (event) => {
		setYoutubePlayer(event.target);
		console.log("Player Ready:", event.target);
	};

	const youtubeChooseTrack = (songId) => {
		console.log(songId);
		const currentIndex = youtubeVideoIds.findIndex((id) => id === songId);
		setYoutubeIsPlaying(true);
		setYoutubeCurrentIndex(currentIndex);
	};

	const handlePlay = () => {
		setYoutubeIsPlaying(true);
		youtubePlayer.playVideo();
	};

	const handlePause = () => {
		setYoutubeIsPlaying(false);
		youtubePlayer.pauseVideo();
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

	return (
		<div className="dashboard">
			<ControlPanel
				spotifyPlaylists={spotifyPlaylists}
				setSpotifySelectedPlaylist={setSpotifySelectedPlaylist}
				spotifyHandlePlaylistSelect={spotifyHandlePlaylistSelect}
				
				youtubePlaylists={youtubePlaylists}
				youtubeHandlePlaylistSelect={youtubeHandlePlaylistSelect}
				setYouTubeSelectedPlaylist={setYouTubeSelectedPlaylist}
			/>
			<MediaPanel 
				accessToken={accessToken}
				trackUri={currentTrack?.uri}
				playlistUri={spotifyTrackURIs} 
				playlistAlbumCovers={playlistAlbumCovers} 
				
				youtubeSelectedPlaylist={youtubeSelectedPlaylist}
				youtubePlaylist={youtubePlaylists[youtubeSelectedPlaylist?.id]} 
				handlePrevious={handlePrevious} handleNext={handleNext}
				handlePlay={handlePlay}
				handlePause={handlePause}
				handlePlaylistEnd={handlePlaylistEnd}
				youtubeCurrentIndex={youtubeCurrentIndex}
				youtubeIsPlaying={youtubeIsPlaying}
				handlePlayerReady={handlePlayerReady}
				youtubeVideoIds={youtubeVideoIds}
				isSpotifySong={isSpotifySong}
			/>
			<Tracks 
				spotifySelectedPlaylist={spotifySelectedPlaylist} 
				spotifyPlaylistTracks={spotifyPlaylistTracks} 
				spotifyChooseTrack={spotifyChooseTrack} 
				
				youtubeSelectedPlaylist={youtubeSelectedPlaylist} 
				youtubePlaylistTracks={youtubePlaylistTracks} 
				youtubeChooseTrack={youtubeChooseTrack} 
				
				setIsSpotifySong={setIsSpotifySong} 
			/>
		</div>
	);
}
