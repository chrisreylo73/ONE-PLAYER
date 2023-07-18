import SpotifySong from "./SpotifySong";
import YoutubeSong from "./YoutubeSong";
const Tracks = ({ spotifySelectedPlaylist, youtubeSelectedPlaylist, youtubePlaylistTracks, youtubeChooseTrack, spotifyPlaylistTracks, spotifyChooseTrack }) => {
	if (spotifySelectedPlaylist == null && youtubeSelectedPlaylist == null) {
		return <div className="tracks"></div>;
	} else if (spotifySelectedPlaylist == null) {
		return (
			<div className="tracks">
				<div className="playlistHeaders-youtube">
					<h3>{youtubeSelectedPlaylist.playlistTitle}</h3>
				</div>
				<div className="tracks-content">
					<ul>
						{youtubePlaylistTracks.map((youtubePlaylistTrack) => {
							return <YoutubeSong youtubeChooseTrack={youtubeChooseTrack} track={youtubePlaylistTrack} />;
						})}
					</ul>
				</div>
			</div>
		);
	} else if (youtubeSelectedPlaylist == null) {
		return (
			<div className="tracks">
				<div className="playlistHeaders-spotify">
					<h3>{spotifySelectedPlaylist.name}</h3>
				</div>
				<div className="tracks-content">
					<ul>
						{spotifyPlaylistTracks.map((playlistTrack) => {
							const track = playlistTrack.track;
							return <SpotifySong spotifyChooseTrack={spotifyChooseTrack} track={track} />;
						})}
					</ul>
				</div>
			</div>
		);
	} else {
		return (
			<div className="tracks">
				<div className="playlistHeaders-spotify">
					<h3>{spotifySelectedPlaylist.name}</h3>
				</div>
				<div className="tracks-content">
					<ul>
						{spotifyPlaylistTracks.map((playlistTrack) => {
							const track = playlistTrack.track;
							return <SpotifySong spotifyChooseTrack={spotifyChooseTrack} track={track} />;
						})}
					</ul>
				</div>

				<div className="playlistHeaders-youtube">
					<h3>{youtubeSelectedPlaylist.playlistTitle}</h3>
				</div>
				<div className="tracks-content">
					<ul>
						{youtubePlaylistTracks.map((youtubePlaylistTrack) => {
							return <YoutubeSong youtubeChooseTrack={youtubeChooseTrack} track={youtubePlaylistTrack} />;
						})}
					</ul>
				</div>
			</div>
		);
	}
};

export default Tracks;
