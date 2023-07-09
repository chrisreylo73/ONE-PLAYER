import React from 'react'

const Song = ({title,album,length, albumCover}) => {
     // Convert milliseconds to minutes and seconds
  const minutes = Math.floor(length / 60000);
  const seconds = Math.floor((length % 60000) / 1000);

  // Format the time as mm:ss
  const formattedLength = length ? `${minutes}:${seconds.toString().padStart(2, '0')}` : "length?";



  return (
    <div className='song'>
         <img className="album-cover" src={albumCover} alt="Album Cover" />
         <p id='title'>{title}</p>
         <p id='album'>{album}</p>
         <p>{formattedLength}</p>
    </div>
  )
}

Song.defaultProps = {
   title: 'Title?',
   album: 'Album?',
   length: 'Length?',
};

export default Song
