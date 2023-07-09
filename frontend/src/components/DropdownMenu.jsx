import React, { useState } from 'react';
import Playlist from './Playlist';

const DropdownMenu = ({ playlists, handlePlaylistSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Spotify Playlists
      </button>
      {isOpen && (
        <div className='spotify-playlists'>
          {playlists.map(playlist => (
            <Playlist
              key={playlist.id}
              title={playlist.name}
              onClick={() => handlePlaylistSelect(playlist)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;