// useState : used to store and and update a value
// useEffect : used to allow side functionality and typically runs by default / in the background. 
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'; // Axios is a JavaScript library for making HTTP requests from web browsers and Node.js, offering a simple and intuitive API for asynchronous data retrieval.
import Song from "./components/Song"
import Playlist from "./components/Playlist"
import Tracks from "./components/Tracks"
import DropdownMenu from "./components/DropdownMenu"
// Define constant values for the Spotify authentication
const CLIENT_ID = 'b96044a084a542c691fe9b0eca9684de';
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const API_BASE_URL = 'https://api.spotify.com/v1';

function App() {
  const [token, setToken] = useState("");  // State variable to store the access token
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    // Check if the token is present in the URL hash or local storage
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    // Extract the token from the URL hash
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      // Store the token in local storage
      window.localStorage.setItem("token", token);
      
      console.log(token);
    }
    // Set the token in the state
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      fetchPlaylists();
    }
  }, [token]);

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
    fetchPlaylistTracks(playlist.id);
  };

  

  const logout = () => {
    // Clear the token from state and local storage
    setToken("");
    window.localStorage.removeItem("token");
  }
  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/me/playlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPlaylists(data.items);
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchPlaylistTracks = async (playlistId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPlaylistTracks(data.items);
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="App">
      
      {/* <h1>Spotify React</h1> */}
      
      {!token ? // if there is no token in local storage then "Login" else you must be logged in and so show a button to log out.
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a> 
        : 
        <div>
           <h1>My Playlists</h1>
           {playlists.length > 0 ? (
            <DropdownMenu playlists={playlists} handlePlaylistSelect={handlePlaylistSelect} ></DropdownMenu>
          ) : (
            <p>No playlists found.</p>
          )}
          {selectedPlaylist && (
            <Tracks selectedPlaylist={selectedPlaylist} playlistTracks={playlistTracks} ></Tracks>
          )}
          <button onClick={logout}> Logout</button>
        </div> 
      }

    </div>
  );
}

export default App;