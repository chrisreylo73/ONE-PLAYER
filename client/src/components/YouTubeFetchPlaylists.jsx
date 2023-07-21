import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
// require("dotenv").config();

const YouTubeFetchPlaylists = () => {
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		const apiKey = "AIzaSyCr8ZkvKo6zU5EmLhoYKdRy2FNhoVKTc8s";
		const channelId = "UCIFkCqVZxZaH6Ng5OwCEDcQ";
		const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&key=${apiKey}`;
		axios
			.get(apiUrl)
			.then((response) => {
				setPlaylists(response.data.items);
			})
			.catch((error) => {
				console.error("Error fetching playlists:", error);
			});
	}, []);

	return (
		<div>
			<h1>Your YouTube Playlists</h1>
			{playlists.length > 0 ? (
				playlists.map((playlist) => (
					<div key={playlist.id}>
						<h2>{playlist.snippet.title}</h2>
						<p>{playlist.snippet.description}</p>
						<img src={playlist.snippet.thumbnails.default.url} alt={playlist.snippet.title} />
					</div>
				))
			) : (
				<p>Loading playlists...</p>
			)}
		</div>
	);
};

export default YouTubeFetchPlaylists;
