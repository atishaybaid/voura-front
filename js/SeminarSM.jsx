import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {GetReq,PostReq} from './utils/apiRequest.jsx';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import '../less/SeminarSM.less';
import SocialPlusOne from 'material-ui/svg-icons/social/plus-one';
import io from "socket.io-client";
import iVConfigs from '../Configs/local.json';

//@todo fetch sem data on load itself
//@todo identify states
class SeminarSM extends Component {

    constructor(props) {
        super();
        this.state = {
            seminarId: 'MNt_-XqOkOI',
                videoId: 'S1eMeX8TR-',
                question: '',
            questionList : []
        }
        this.askQuestionChange = this.askQuestionChange.bind(this);
        this.handleAskQuestion = this.handleAskQuestion.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.generateQuesList = this.generateQuesList.bind(this);
        this.voteQuestion = this.voteQuestion.bind(this);
        this.getVoteCounts = this.getVoteCounts.bind(this);
        this.socketHandling = this.socketHandling.bind( this );

    };

    socketHandling(){

        var sockConfigs = iVConfigs.seminar.socketData;
        sockConfigs['query'] = "userId=2";
        var notiSocket = io.connect( iVConfigs.seminar.socketUrl, sockConfigs );

        this.notiSocket = notiSocket;
        notiSocket.on('connect', function(){
            // call the server-side function 'adduser' and send one parameter (value of prompt)
            var user = {};
            notiSocket.emit('adduser', user);
        });

        notiSocket.on('questionAdded', function(data){
            // call the server-side function 'adduser' and send one parameter (value of prompt)
            console.log( data );
        });
    }

    componentDidMount(){
        this.getQuestions();
        this.getVoteCounts();
        this.socketHandling();
    }

    voteQuestion( qId, vote ){
        let data = {
            videoId: this.state.videoId,
            qId: qId,
            vote: vote
        }
        console.log( data );
        var that = this;
        var path ='questions/vote/';
        PostReq( path, data )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    //that.setState( { questionList: response.data.data } ) ;
                    console.log( response );
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    getVoteCounts(){
        let data = {
            id: this.state.videoId,
            type: 'video'
        }
        console.log( data );
        var that = this;
        var path ='questions/votecount/';
        PostReq( path, data )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    //that.setState( { questionList: response.data.data } ) ;
                    console.log( response );
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getQuestions(){

        let data = {
            videoId: this.state.videoId,
            user: 'dpk22dev@gmail.com'
        }
        var that = this;
        var path ='questions/questions/?videoid='+data.videoId;
        GetReq( path )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    that.setState( { questionList: response.data.data } ) ;
                    //console.log( that.state.questionList );
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    handleAskQuestion(){
        let data = {
            videoId: this.state.videoId,
            question: this.state.question,
            user: 'dpk22dev@gmail.com'
        }
        this.notiSocket.emit('questionAdded', data.question);

        var path ='questions/save';
        var that = this;
        PostReq( path, data )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    console.log( response );
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    askQuestionChange(event,newValue){
        this.setState({question:newValue});
    };

    generateQuesList(){
        console.log( this.state.questionList );
        var that = this;
        var quesList = this.state.questionList.map( function( item ){
            return <div key ={item._id}>
                <ListItem primaryText={item.question} />
                <FlatButton className="control-btn" label='upvote' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={that.voteQuestion.bind( this, item._id, 'upvote' ) } target="_blank"/>
                <FlatButton className="control-btn" label='downvote' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={that.voteQuestion.bind( this, item._id, 'downvote' ) } target="_blank"/>
            </div>
        } )
        console.log( quesList );
        return quesList;
    }
    render(){
        return (
            <div className="seminarSM-page">
                <VrHeader />
                <div className="main-container">
                    <div className="seminar-left-coloumn">
                            <p>
                                {this.state.message}
                            </p>
                            <div className="youtube-embed">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/WOoJh6oYAXE" frameBorder="0" gesture="media" allowFullScreen></iframe>
                            </div><br />
                        <TextField
                            hintText="Type a question"
                            floatingLabelText="Question"
                            floatingLabelFixed={true}
                            type="text"
                            onChange={this.askQuestionChange}
                            value={this.state.question}
                        />
                        <FlatButton className="control-btn" label='ask' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleAskQuestion.bind(this)} target="_blank"/>
                    </div>
                    <div className="seminar-right-coloumn">

                        <div className="sQuestion-list">
                            <List>
                                <Subheader>Recent chats</Subheader>
                                {this.generateQuesList()}
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



}

export default SeminarSM;