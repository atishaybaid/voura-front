import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {GetReq,PostReq} from './utils/apiRequest.jsx';
import iVConfigs from '../Configs/local.json';

class VideoShow extends Component {

    constructor(props) {
        super(props);
        var videoId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        this.state = {
            semState: 'FETCH_DATA',
            videoId: videoId,
        }
        this.handleAskQuestion = this.handleAskQuestion.bind(this);
        this.getVideoData = this.getVideoData.bind( this );
    };

    componentDidMount(){
        //inititlly show loading message

    //get infor about videoid
        this.getVideoData( this.state.videoId ).then( function ( resolve ) {
            
        }, function ( reject ) {
            
        });
    //get info about prof giving this seminar

    //get answered question location
    //get relevant videos for this user, these tags
    }

    getVideoData( videoId ){

        var that = this;
        var path ='video/show/?videoid='+videoId;
        var promise = new Promise( function ( resolve, reject ) {
            GetReq( path )
                .then(function (response) {
                    console.log(response.status);
                    if(response.status == 200){
                        resolve( response.data.data );
                        console.log( that.state.questionList );
                    } else {
                        reject( response );
                    }
                })
                .catch(function (error) {
                    reject(error);
                });
        } );
        return promise;
    }

    render(){
        return (
            <div class="video-show-page">
                <VrHeader />
                <p>
                    {this.state.message}
                </p>
                <div class="prof-desc">

                </div>
                <div class="left-col">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/WOoJh6oYAXE" frameBorder="0" gesture="media" allowFullScreen></iframe>
                </div>
                <div class="right-col">
                    <List>
                        <Subheader>Questions answered</Subheader>
                        {this.generateQuesList()}
                    </List>
                </div>
            </div>
        )
    }
}

export  default VideoShow;