import React from 'react'
import Song from "./Song"
const Tracks = ({selectedPlaylist, playlistTracks}) => {
  return (
    <div className='tracks'>
      <div className='playlistHeaders-spotify' >
         <h3>{selectedPlaylist.name}</h3>
      </div>
      <div className='tracks-content'>
        {playlistTracks.length > 0 ? (
          <ul>
            {playlistTracks.map(track => (
              <Song key={track.track.id} albumCover={track.track.album.images[0].url} title={track.track.name} artist={track.track.artists[0].name} album={track.track.album.name} length={track.track.duration_ms}></Song>
            ))}
          </ul>
        ) : (
          <p>No tracks found in the selected playlist.</p>
        )}
      </div>
      <div className='playlistHeaders-youtube' >
         <h3>Youtube Playlist</h3>
      </div>
    </div>
  )
}

export default Tracks
