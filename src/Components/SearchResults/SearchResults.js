import {React, Component} from 'react';
import './SearchResults.css'
import TrackList from '../TrackList/TrackList.js'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'

class SearchResults extends Component {
    render(){

        return(
            <div className="SearchResults">
                <h2>Results</h2>
                {this.props.LoadRender ? <FontAwesomeIcon id='loader' icon={faCompactDisc} spin size="5x"/> : 
                <TrackList tracks={this.props.searchresults} onAdd={this.props.onAdd} isRemoval={false} onPlay={this.props.onPlay}/>}
            </div>
        )

    }
}


export default SearchResults;