import React, { useEffect, useState } from 'react';
// import ReactPlayer from 'react-player';

const MusicPlayer = ({ accessToken, trackUri }) => {
  if (!accessToken || !trackUri) {
    return null; // Render nothing if there's no access token or track URI
  }
  
  return (
    <div className="music-player">
      <div className="currentTrack">
         {/* <button className="play-button" onClick={handlePlayButtonClick}>
          {playing ? 'PAUSE' : 'PLAY'}
        </button> */}
      </div>
    </div>
  );
};

export default MusicPlayer;


// const [playing, setPlaying] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [player, setPlayer] = useState(null);

//   useEffect(() => {
//     // Load the Spotify Web Playback SDK script dynamically
//     const script = document.createElement('script');
//     script.src = 'https://sdk.scdn.co/spotify-player.js';
//     script.async = true;
//     document.body.appendChild(script);

//     // Initialize the Spotify player
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const newPlayer = new window.Spotify.Player({
//         name: 'My Music Player',
//         getOAuthToken: (cb) => {
//           cb(accessToken);
//         },
//       });

//       // Set the player in state
//       setPlayer(newPlayer);

//       // Connect to the Spotify player
//       newPlayer.connect().then((success) => {
//         if (success) {
//           console.log('Connected to Spotify player');
//         }
//       });

//       // Set the current track when the playback state changes
//       newPlayer.addListener('player_state_changed', ({ track_window }) => {
//         if (track_window.current_track) {
//           setCurrentTrack(track_window.current_track);
//         }
//       });

//       // Clean up the player when the component is unmounted
//       return () => {
//         newPlayer.disconnect();
//         newPlayer.removeListener('player_state_changed');
//       };
//     };
//   }, [accessToken, selectedPlaylist]);

//   // Play or pause the track when the "Play" button is clicked
//   const handlePlayButtonClick = () => {
//     if (playing) {
//       player.pause();
//     } else {
//       playRandomTrack();
//     }
//     setPlaying(!playing);
//   };

//   const playRandomTrack = () => {
//     const randomIndex = Math.floor(Math.random() * selectedPlaylist.length);
//     const trackUri = selectedPlaylist[randomIndex].uri;
//     player.play({ uris: [trackUri] });
//   };
