import React, { useState, useEffect } from "react";

const YouTubeAuth = ({ clientId, clientSecret }) => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [playlists, setPlaylists] = useState([]);

	const authenticate = () => {
		// Redirect to Google's OAuth2 consent screen
		const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(window.location.origin + "/callback")}&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly`;

		window.location.href = authUrl;
	};

	const getPlaylists = async (accessToken) => {
		try {
			const response = await fetch("https://www.googleapis.com/youtube/v3/playlists", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setPlaylists(data.items);
			} else {
				console.error("Failed to fetch playlists:", response.status, response.statusText);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		// Get the access token from the URL after successful authentication
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");

		if (code) {
			// Exchange the code for an access token
			const formData = new URLSearchParams();
			formData.append("client_id", clientId);
			formData.append("client_secret", clientSecret);
			formData.append("code", code);
			formData.append("redirect_uri", window.location.origin + "/callback");
			formData.append("grant_type", "authorization_code");

			fetch("https://accounts.google.com/o/oauth2/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: formData,
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.access_token) {
						setIsSignedIn(true);
						getPlaylists(data.access_token);
					}
				})
				.catch((error) => console.error("Error exchanging code for access token:", error));
		}
	}, [clientId, clientSecret]);

	return (
		<div>
			{!isSignedIn ? (
				<button onClick={authenticate}>Sign In with YouTube</button>
			) : (
				<div>
					<h2>My Playlists:</h2>
					<ul>
						{playlists.map((playlist) => (
							<li key={playlist.id}>{playlist.snippet.title}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default YouTubeAuth;
