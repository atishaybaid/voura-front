import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {GetReq,PostReq} from './utils/apiRequest.jsx';
import iVConfigs from '../Configs/local.json';

class VideoShow extends Component {

    constructor(props) {
        super(props);
        var videoId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        this.state = {
            videoId: videoId,
            userInfo: {},
            questList: [],
            recVids: []
        }

        this.getVideoData = this.getVideoData.bind( this );
        this.generateQuesList = this.generateQuesList.bind(this);
    };

    componentDidMount(){
        //inititlly show loading message

    //get infor about videoid
        var that = this;
        this.getVideoData( this.state.videoId ).then( function ( resolve ) {
            console.log( resolve );
            var userId = resolve.userID;
            Promise.all( [ that.getUserInfo( userId ), that.getQuestions( that.state.videoId ), that.getRecommendVideos( that.state.videoId )] )
                .then( function( allData ){
                    var userInfo, qList, vidData = [];
                    if( allData[0] )
                        userInfo = allData[0];
                    if( allData[1] )
                        qList = allData[1];
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

    getUserInfo( userId ){
        var that = this;
        var path ='users/getuser/?id='+userId;
        var promise = new Promise( function ( resolve, reject ) {
            GetReq( path, iVConfigs.common.baseUrl )
                .then(function (response) {
                    if(response.status == 200 && response.data.status == 'SUCCESS'){
                        resolve( response.data.data );
                    } else {
                        reject( response );
                    }
                })
                .catch(function (error) {
                    return error;
                });
        } );
        return promise;
    }

    getQuestions( videoId ){
        var that = this;
        var path ='questions/questions/?videoid='+videoId;
        var promise = new Promise( function ( resolve, reject ) {
            GetReq( path, iVConfigs.common.baseUrl )
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
                    return error;
                });
        } );
        return promise;
    }

    getVideoData( videoId ){

        var that = this;
        var path ='video/show/'+videoId;
        var promise = new Promise( function ( resolve, reject ) {
            GetReq( path, iVConfigs.common.baseUrl )
                .then(function (response) {
                    console.log(response.status);
                    if(response.status == 200 && response.data.status == 'SUCCESS' ){
                        resolve( response.data.data );
                    } else {
                        reject( response );
                    }
                })
                .catch(function (error) {
                    return error;
                });
        } );
        return promise;
    }

    getRecommendVideos(){
        var promise = new Promise( function ( resolve, reject ) {
            resolve( [] );
        });
        return promise;
    }

    handleQuestClick(){
//move to particular position in video
    }

    generateProfileDesc(){
        var that = this;

            return <div>
                In below video Mr {this.state.userInfo.name} describes about {this.state.userInfo.title}.
            </div>


    }

    generateQuesList(){
        var that = this;
        var quesList = this.state.questList.map( function( item, index ){
            return <div key ={`selectedQuest.quest_${index}`}>
                <ListItem primaryText={item.question} onClick={that.handleQuestClick} />
            </div>
        } )
        //console.log( quesList );
        return quesList;
    }
    generateVideosList(){

    }

    render(){
        return (
            <div className="video-show-page">
                <VrHeader />
                <p>
                    {this.state.message}
                </p>
                <div className="prof-desc">
                    {this.generateProfileDesc()}
                </div>
                <div className="left-col">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/WOoJh6oYAXE" frameBorder="0" gesture="media" allowFullScreen></iframe>
                </div>
                <div className="right-col">
                    <List>
                        <Subheader>Questions answered</Subheader>
                        {this.generateQuesList()}
                    </List>
                </div>
                <div className="related-videos">
                    <List>
                        <Subheader>Questions answered</Subheader>
                        {this.generateVideosList()}
                    </List>
                </div>
            </div>
        )
    }
}

export  default VideoShow;