import React from 'react';

const Song = ({ title, artist, album, length, albumCover, playTrack }) => {
  const minutes = Math.floor(length / 60000);
  const seconds = Math.floor((length % 60000) / 1000);
  const formattedLength = length ? `${minutes}:${seconds.toString().padStart(2, '0')}` : 'length?';

  const handleSongClick = () => {
    const track = {
      title,
      artist,
      album,
      length,
      albumCover,
      uri: 'https://api.spotify.com/v1' // Provide a default URI value
    };
    playTrack(track);
  };

  return (
    <div className="song" onClick={handleSongClick}>
      <img className="album-cover" src={albumCover} alt="Album Cover" />
      <div className="songInfo">
        <p id="title">{title}</p>
        <p id="artist">{artist}</p>
      </div>
      <p>{formattedLength}</p>
    </div>
  );
};

Song.defaultProps = {
  title: 'Title?',
  album: 'Album?',
  length: 'Length?'
};

export default Song;
