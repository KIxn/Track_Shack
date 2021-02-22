import './App.css';
import {React, Component} from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResult from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


class App extends Component {

  constructor(props){
    //audio player
    
    const a = new Audio();
    a.id = 'AudioPlayer';
    document.body.appendChild(a);

    super(props);
    this.state = {
      searchResults: []
      ,playlistName: '',
      playlistTracks: [],
      renderLoad : false,
      playingObj: null,
      isPlaying: false
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.preview = this.preview.bind(this);
  }

  preview(trackComponent,play){
    if(play){
      if(this.state.isPlaying){
        const a = document.getElementById('AudioPlayer');
        a.pause();
        a.src = trackComponent.props.track.preview;
        console.log(trackComponent.props.track.preview);

        this.state.playingObj.setState({isPlaying: false});

        this.setState({playingObj: trackComponent});
        a.oncanplaythrough = () => { a.play(); }

    }else{
      const a = document.getElementById('AudioPlayer');
        a.pause();
        a.src = trackComponent.props.track.preview;
        console.log(trackComponent.props.track.preview);
        this.setState({isPlaying: true});

        this.setState({playingObj: trackComponent});
        a.oncanplaythrough = () => { a.play(); }
    }
    }
    else{
      const a = document.getElementById('AudioPlayer');
      a.pause();
      this.setState({
        isPlaying: false,
        playingObj: null
      })
    }
  }

  addTrack(track){
    const tmpList = this.state.playlistTracks;
    if((tmpList.find(t => {return(t.id === track.id);})) === undefined){
      tmpList.push(track);
      this.setState({playlistTracks: tmpList});
    }
  }

  

  removeTrack(track){
    const tmpList = this.state.playlistTracks.filter(t => {
      return(track.id !== t.id);
    })
    this.setState({
      playlistTracks: tmpList
    })
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(){
    let uriArr = [];
    this.state.playlistTracks.map(t => {
      uriArr.push(t.id);
    });
    //uriArr now contains the data
  }

  async search(term){
    //set load state
    this.setState({renderLoad: true});
    console.log(term);
    const Arr = this.state.searchResults;
    let tmparr = await Spotify.search(term);
    

    //sleeper
    await new Promise(r => setTimeout(r, 300));
    this.setState({renderLoad: false});

    this.setState({
      //change load state
      searchResults : tmparr
    });
  }

  savePlaylist(){
    let uriArr = [];
    this.state.playlistTracks.map((t) => {uriArr.push(t.uri)});

    Spotify.savePlaylist(this.state.playlistName,uriArr);

    this.setState({playlistName: '',playlistTracks: []},() =>{
      console.log(this.state.playlistName);
      console.log(this.state.playlistTracks);
      document.getElementById('playlistrack').value = '';
    });
  }

  render(){
    return(
      <div>
        <h1>Tra<span className='highlight'>ck</span> Sha<span className='highlight'>ck</span></h1>
        <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResult searchresults={this.state.searchResults} onAdd={this.addTrack} LoadRender={this.state.renderLoad} onPlay={this.preview}/>
              <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onSave={this.savePlaylist} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onPlay={this.preview}/>
            </div>
        </div>
      </div>
    );
  }

}

export default App;
