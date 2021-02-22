import {React, Component} from 'react';
import './Track.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'


class Track extends Component {

    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.stopTrack = this.stopTrack.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.state = {
            isPlaying: false
        }
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    playTrack(){
        this.setState({isPlaying: true});
        this.props.onPlay(this,true);
    }

    stopTrack(){
        this.setState({isPlaying: false});
        this.props.onPlay(this,false);
    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artists.join(' ')} | {this.props.track.album.name}</p>
                </div>
                {this.props.isRemoval ? <button onClick={this.removeTrack} className="Track-action">-</button> : 
                <button onClick={this.addTrack} className="Track-action">+</button>}
                {this.state.isPlaying ? <button className="Track-action" onClick={this.stopTrack}><FontAwesomeIcon icon={faStopCircle} spin/> </button> :
                <button className="Track-action" onClick={this.playTrack}><FontAwesomeIcon icon={faPlayCircle}/> </button>}
            </div>
        )

    }
}

export default Track;