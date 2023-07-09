import React, { useState } from 'react';
import Playlist from './Playlist';

const DropdownMenu = ({ playlists, handlePlaylistSelect, token, logout, handleButtonClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <div className="spotify">
         <button className="dropdown-toggle" onClick={toggleDropdown}>
           Spotify Playlists
         </button>
         {!token ?  <button id='login' onClick={handleButtonClick}>Login to Spotify</button>
             : <button id='logout' onClick={logout}> Logout</button>
         }
      </div>
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