//Token
let Usr_Token = '';
let Exp_Time;
const Client_ID = '5cc42e2699c6433ea336fa61f232c47e';
const redir = 'https://friendly-payne-1f9778.netlify.app';

const Spotify = {
    getAccessToken(){
        if (Usr_Token){return Usr_Token;}
        else{
            try{
                  //check URL for access_token
                const Arr = Array(window.location.href.match(/access_token=([^&]*)/)[1]);
                Arr.push(window.location.href.match(/expires_in=([^&]*)/)[1]);
                Usr_Token = Arr[0]; Exp_Time = Arr[1];
            }catch(e){
                console.log(e.message);
            }

        if(Usr_Token !== ''){
            window.setTimeout(() => Usr_Token = '',Exp_Time * 1000);
            window.history.pushState('Access Token',null,'/');
        }else{
            window.location = `https://accounts.spotify.com/en/authorize?client_id=${Client_ID}&scope=playlist-modify-public playlist-modify-private&response_type=token&redirect_uri=${redir}`
        }
        }
        
    },
    Factory(obj){
        /*
        items needed:
        id = track.id
        track name = track.name
        array of artists = track.arr[i].name
        album = track.album.name
        uri = track.uri
        */
       return {
           id: obj.id,
           name: obj.name,
           artists: Array(obj.artists.map((artist) =>{return(artist.name);})),
           album: {name: obj.album.name},
           uri: obj.uri
       }
    },
    async savePlaylist(playlistName,trackArr){
        this.getAccessToken();
        if(playlistName && trackArr){
            let headers = {
                Authorization: `Bearer ${Usr_Token}`
            };
            let Usr_id = '';
            let playlist_id = '';

            //get user id
            try{
                let resp = await fetch('https://api.spotify.com/v1/me',{headers:headers});
                if(resp.ok){
                    let jsonresp = await resp.json();
                    //console.log(jsonresp);
                    Usr_id = jsonresp.id;
                    console.log(Usr_id);
                }else{
                    throw new Error('Spotify API Error: Cannot Obtain User ID');
                }
            }catch(e){
                console.log(e.message)
            }

            //post new playlist name
            try{
                let resp = await fetch(`https://api.spotify.com/v1/users/${Usr_id}/playlists`,{
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({name:playlistName})
                })

                if(resp.ok){
                    let jsonresp = await resp.json();
                    playlist_id = jsonresp.id;
                }else{
                    throw new Error('Spotify API Error: cannot create playlist');
                }
            }catch(e){
                console.log(e.message);
            }

            //post tracks
            try{
                let resp = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,{
                    method: 'POST',
                    headers:headers,
                    'Content-Type': 'application/json',
                    body: JSON.stringify({uris: trackArr})
                });

                if(resp.ok){
                    console.log(await resp.json());
                }else{
                    throw new Error('Spotify API Error: unable to update Playlist');
                }
            }catch(e){
                console.log(e.message);
            }

        }else{
            alert("Playlist name not found \n OR \nPlaylist is EMPTY")
            return;
        }
    },
    async search(term){
        this.getAccessToken();
        //array containing songs
        const Arr = [];

        //make http request
        try{
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=30`,{
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Usr_Token}`
                }
            });

            if(response.ok){
                const jsonResp = await response.json();
                await jsonResp.tracks.items.map((item) => {Arr.push( this.Factory(item))});
                //loop through array and add preview url
                Arr.forEach(async (obj) => {
                    try{
                        const response = await fetch(`https://api.spotify.com/v1/tracks/${obj.id}`,{
                        headers:{
                            Authorization: `Bearer ${Usr_Token}`
                        }
                    });

                    if (response.ok){
                        const trackObj = await response.json();
                        obj.preview = String(trackObj.preview_url);
                    }else{
                        throw new Error('Spotify API Error: unable to get track preview');
                    }

                    }catch(e){
                        console.log(e.message);
                    }
                });
                return(Arr);
            }else{
                throw new Error('Spotify API ERROR')
            }
        }catch(err){
            console.log(err.message);
        }
        return(Arr);
    }
};

export default Spotify;
