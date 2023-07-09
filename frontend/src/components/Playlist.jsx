import React from 'react'

const Playlist = ({title, onClick}) => {
  return (
    <div className='playlist' onClick={onClick}>
      <p>{title}</p>
    </div>
  )
}

Playlist.defaultProps = {
   title: 'Title?',
};

export default Playlist
