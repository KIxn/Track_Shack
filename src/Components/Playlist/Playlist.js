import {React, Component} from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends Component {

    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        //e => event// onChange
        this.props.onNameChange(e.target.value);
    }

    render() {
        return(
            <div className="Playlist">
                <input id='playlistrack' type="text" placeholder="Enter New Playlist Name Here" onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.tracks} onPlay={this.props.onPlay} onRemove={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;