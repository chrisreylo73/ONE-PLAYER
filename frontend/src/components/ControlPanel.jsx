import React from 'react'
import DropdownMenu from './DropdownMenu'


const ControlPanel = ({playlists,handlePlaylistSelect,token,AUTH_ENDPOINT,CLIENT_ID,REDIRECT_URI,RESPONSE_TYPE,logout}) => {

  const handleButtonClick = () => {
    const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
    window.location.href = loginUrl;
  };

  return (
    <div className='controlPanel'>
        <DropdownMenu playlists={playlists} handlePlaylistSelect={handlePlaylistSelect} token={token} logout={logout} handleButtonClick={handleButtonClick}></DropdownMenu>
    </div> 
  )
}

export default ControlPanel
