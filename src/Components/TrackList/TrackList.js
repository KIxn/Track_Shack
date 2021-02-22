import {React, Component} from 'react';
import "./TrackList.css";
import Track from '../Track/Track.js'

class TrackList extends Component {

    render() {
        return (
            <div className="TrackList">
                {
                this.props.tracks.map(t => {
                   return (<Track track={t} key={t.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} onPlay={this.props.onPlay}/>)
                })
                }
            </div>
        )
        
    }
}

export default TrackList;