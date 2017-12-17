import React ,{ Component } from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {GetReq,PostReq} from './utils/apiRequest.jsx';
import iVConfigs from '../Configs/local.json';
import YouTube from 'react-youtube';
import '../less/common.less';
import '../less/SeminarPM.less';
import Utils from './utils/common.js';
import UserCard from './UserCard';
import requests from './utils/requests';

//@todo show only answered questions

class VideoShow extends Component {

    constructor(props) {
        super(props);
        var videoId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        //videoId = "yv5i0oTHubc";
        this.state = {
            videoId: videoId,
            videoData: {},
            userInfo: {},
            questList: [],
            recVids: []
        }

        this.generateQuesList = this.generateQuesList.bind(this);
        this.youtubeOpts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1
            }

        }
        var youtubePlayer = null;
        this._onReady = this._onReady.bind(this);
    };



    getAnsweredQuestions( arr ){
        var res=[];
        arr.forEach( function ( qObj ) {
            if( qObj.answered == true ){
                res.push( qObj );
            }
        })
        return res;
    }
    componentDidMount(){
        //inititlly show loading message

    //get infor about videoid
        var that = this;
        requests.getVideoData( this.state.videoId ).then( function ( resolve ) {

            that.setState( { videoData: resolve } );
            var userId = resolve.userID;
            Promise.all( [ requests.getUserInfo( userId ), requests.getQuestionsForVideo( that.state ), that.getRecommendVideos( that.state.videoId )] )
                .then( function( allData ){
                    var userInfo, qList, vidData = [];
                    if( allData[0] )
                        userInfo = allData[0];

                    if( allData[1] ){
                        qList = that.getAnsweredQuestions( allData[1] );
                    }

                    if( allData[2] )
                        vidData = allData[2];
                    console.log( allData );
                    that.setState( { userInfo: userInfo, questList: qList, recVids: vidData } );

                } )
                .catch( function ( error ) {

                });
            
        }, function ( reject ) {
            console.log('error while fetching video info');
        });
    //get info about prof giving this seminar

    //get answered question location

    //get relevant videos for this user, these tags
        
    }

    getRecommendVideos(){
        var promise = new Promise( function ( resolve, reject ) {
            resolve( [] );
        });
        return promise;
    }

    handleQuestClick( timeOffset , b){
//move to particular position in video
        if( this.youtubePlayer ){
            this.youtubePlayer.seekTo( timeOffset );
        }
    }

    generateProfileDesc(){
        var that = this;

        if( Utils.isNonEmptyObject(this.state.userInfo) && Utils.isNonEmptyObject(this.state.videoData) ) {
            return (
                <UserCard userInfo={this.state.userInfo} videoData={this.state.videoData}/>
            )
        } else {
            return ( <div></div> )
        }

    }

    generateQuesList(){
        var that = this;
        var quesList = this.state.questList.map( function( item, index ){
            console.log( item);
            var userInfo = { name : 'Ethan hunt', title : "MI4", avatar: '/images/jsa-128.jpg', profileUrl : '/profile/1' };
            return ( <div key ={`selectedQuest.quest_${index}`}>
                {Utils.isNonEmptyObject(userInfo) ? <UserCard userInfo={userInfo}/> : "" }
                <ListItem primaryText={item.question} onClick={that.handleQuestClick.bind( that, item.time )} />
                <hr className="hr-primary" />
            </div> )
        } )
        //console.log( quesList );
        return quesList;
    }

    generateVideosList(){

    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        this.youtubePlayer = event.target;
    }

    render(){
        return (
            <div className="video-show-page">
                <p>
                    {this.state.message}
                </p>
                <div className="prof-desc col-sm-12">
                    {this.generateProfileDesc()}
                </div>
                <div className="seminar-left-coloumn col-sm-12 col-md-8">
                    <div id="player">
                        <YouTube
                            videoId={this.state.videoId}
                            opts={this.youtubeOpts}
                            onReady={this._onReady}
                        />
                    </div>
                </div>
                <div className="seminar-right-coloumn col-sm-8 col-md-4 pre-scrollable">
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