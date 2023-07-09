import React from 'react'
import Song from "./Song"
const Tracks = ({selectedPlaylist, playlistTracks}) => {
  return (
    <div className='tracks'>
      {/* <h2>{selectedPlaylist.name}</h2> */}
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
    </div>
  )
}

export default Tracks
