import React, { useEffect, useState } from 'react';
import MusicPlayer from './components/MusicPlayer';
import './App.css';
import axios from 'axios';
import Tracks from "./components/Tracks"
import ControlPanel from './components/ControlPanel';

const CLIENT_ID = 'b96044a084a542c691fe9b0eca9684de';
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const API_BASE_URL = 'https://api.spotify.com/v1';

function App() {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [selectedTrackUri, setSelectedTrackUri] = useState(null);
    const [song, setSong] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.localStorage.setItem("token", token);
    }

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
    setToken("");
    window.localStorage.removeItem("token");
    setSelectedPlaylist("");
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

  const playTrack = (track) => {
    console.log(track);
    setSelectedTrackUri(track.uri);
  };

  const handlePlaySong = async () => {
    try {
      // Make a request to the Spotify API to get a song
      const response = await fetch(`https://api.spotify.com/v1/tracks/5lka5RUbLVQGO94mKAPMRO`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSong(data);
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="App">

    <div>
      <button onClick={handlePlaySong}>Play Song</button>
       {song && (
        <div>
          <h2>{song.name}</h2>
          <p>Artist: {song.artists[0].name}</p>
          <p>Album: {song.album.name}</p>
          <img src={song.album.images[0].url} alt="Album Cover" />
          <audio src={song.preview_url} controls />
        </div>
      )}
    </div>
      <hr />
      <div>
        {playlists.length > 0 ? (
          <ControlPanel
            token={token}
            AUTH_ENDPOINT={AUTH_ENDPOINT}
            CLIENT_ID={CLIENT_ID}
            REDIRECT_URI={REDIRECT_URI}
            RESPONSE_TYPE={RESPONSE_TYPE}
            playlists={playlists}
            handlePlaylistSelect={handlePlaylistSelect}
            logout={logout}
          />
        ) : (
          <p>No playlists found.</p>
        )}
        <Tracks
          selectedPlaylist={selectedPlaylist}
          playlistTracks={playlistTracks}
          playTrack={playTrack}
        />
        <MusicPlayer accessToken={token} trackUri={selectedTrackUri} />
      </div>
    </div>
  );
}

export default App;



// import React, { useEffect, useState } from 'react';

// const App = () => {
//   const [accessToken, setAccessToken] = useState('');
//   const [song, setSong] = useState(null);

//   useEffect(() => {
//     const hash = window.location.hash;
//     let token = window.localStorage.getItem("token");

//     if (!token && hash) {
//       token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
//       window.localStorage.setItem("token", token);
//     }

//     setToken(token);
//   }, []);

//   const handlePlaySong = async () => {
//     try {
//       // Make a request to the Spotify API to get a song
//       const response = await fetch('https://api.spotify.com/v1/tracks/57SZLxVtBQiDsYqcqicuYE"}', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSong(data);
//       } else {
//         console.log('Error:', response.status);
//       }
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePlaySong}>Play Song</button>
//       {song && (
//         <div>
//           <h2>{song.name}</h2>
//           <p>Artist: {song.artists[0].name}</p>
//           <p>Album: {song.album.name}</p>
//           <img src={song.album.images[0].url} alt="Album Cover" />
//           <audio src={song.preview_url} controls />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;