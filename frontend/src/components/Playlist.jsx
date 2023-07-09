import React from 'react'

const Playlist = ({cover, title, onClick}) => {
  return (
    <div className='playlist'   onClick={onClick}>
      <p>{title}</p>
    </div>
  )
}

Playlist.defaultProps = {
   title: 'Title?',
   cover: null,
};

export default Playlist
