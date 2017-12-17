import React ,{ Component } from 'react';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {GetReq,PostReq} from './utils/apiRequest.jsx';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import '../less/SeminarSM.less';
import SocialPlusOne from 'material-ui/svg-icons/social/plus-one';
import io from "socket.io-client";
import iVConfigs from '../Configs/local.json';
import ThumbsUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbsDownIcon from 'material-ui/svg-icons/action/thumb-down';
import Utils from './utils/common.js';
import UserCard from './UserCard';
import requests from './utils/requests';

import { withCookies, Cookies } from 'react-cookie';
import  {connect} from 'react-redux';

const VOTE_TYPES = {
    UPVOTE: 'upvote',
    DOWNVOTE: 'downvote'
}


class SeminarSM extends Component {

    constructor(props) {
        super( props );
        var videoId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        var youtubeUrl = "https://www.youtube.com/embed/WOoJh6oYAXE";
        this.state = {
            videoId: videoId,
            question: '',
            questionList : [],
            seminarData: {},
            youtubeOpts : {
                height: '390',
                width: '640',
                url: youtubeUrl
            }
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

        const { cookies } = this.props;

        const userId = cookies.get('userId');
        //console.log( 'userId:' + userId );

        var that = this;
        var sockConfigs = iVConfigs.seminar.socketData;

        sockConfigs['query'] = "userId="+userId;
        var notiSocket = io.connect( iVConfigs.seminar.socketUrl, sockConfigs );

        this.notiSocket = notiSocket;
        notiSocket.on('connect', function(){
            // call the server-side function 'adduser' and send one parameter (value of prompt)
            var user = {};
            user.username = userId;
            user.conf = that.state.videoId;
            notiSocket.emit('adduser', user);
        });

        notiSocket.on('questionAdded', function(data){
            // call the server-side function 'adduser' and send one parameter (value of prompt)
            console.log('got questiosn');
            console.log( data );
            var questions = that.state.questionList;
            questions.push( data );
            that.setState({ questionList:questions });
        });

        notiSocket.on('questionAddedAjaxNow', function(){
            // call the server-side function 'adduser' and send one parameter (value of prompt)
            console.log('got questiosn ajax');
            that.getQuestions();
        });

        notiSocket.on('removeQuestion', function( qIds ){
            // call the server-side function 'adduser' and send one parameter (value of prompt)
            console.log('remove question');
            var questions = that.deleteQuestions( that.state.questionList, qIds );
            that.setState({ questionList:questions });
        });
        notiSocket.on('questionVoteUpdated', function( sockData ){
            //based on voting tupe change respective question count
            //don't fire event again
            that.onVoteQuestionSuccess( sockData.qId, sockData.vote, false );
        });

    }

    deleteQuestions( qArray, qIds ){
        for( var j = 0; j < qIds.length; j++ ){
            for(var i = 0; i < qArray.length; i++) {
                if(qArray[i]._id == qIds[j] ) {
                    qArray.splice(i, 1);
                    break;
                }
            }
        }
        return qArray;
    }



        getVoteCounts(){
            let data = {
                id: this.state.videoId,
                type: 'video'
            }
            return requests.voteCountForQuestions( data );
        }

    getQuestions(){
        let data = {
            videoId: this.state.videoId
        }
        return requests.getQuestionsForVideo(data);
    }

    getQuestionList( qArray, vArray ){
        var rArray = [];
        qArray.forEach( function ( qObj ) {
            qObj.score = 0;
            if( vArray && vArray.length > 0 ){
                let obj = vArray.find( function( vObj ){ if( vObj.qId == qObj["_id"] ) return vObj.qId; else return {}; } );
                if( obj )
                    qObj.score = obj.score;
            }


            rArray.push( qObj );
        })
        return rArray;
    }

    componentDidMount(){
        var that = this;
        var semObj = { videoId: this.state.videoId };
        Promise.all( [ that.getQuestions(), that.getVoteCounts(), requests.fetchSeminarData( semObj ) ] )
            .then(  function ( allData ) {
                var questions = that.getQuestionList( allData[0], allData[1] );
                that.setState({ questionList:questions, seminarData : allData[2] });
                if( allData[2] ){
                    var ownerId = allData[2].userID;
                    requests.getUserInfo( ownerId ).then(function ( resolve ) {
                        that.setState({ userInfo: resolve } );
                    }, function ( reject ) {

                    });
                }

                that.socketHandling();
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    getQuestionInxWithQid( questions, qId ){
        var inx = -1;
        if( questions && questions.length > 0 ){
            questions.forEach( function ( item, inx ) {
                if( item._id == qId ){
                    return inx;
                }
            } )
        }
        return inx;
    }

    onVoteQuestionSuccess( qId, vote, fireSocketEvent = true ){
//inc count on particular question
        var questions = this.state.questionList;
        var inx = this.getQuestionInxWithQid( questions, qId );
        if( inx > 0 ){
            if( vote == VOTE_TYPES.UPVOTE ){
                questions[inx].upvote = ++questions[inx].upvote;
            } else {
                questions[inx].downvote = ++questions[inx].downvote;
            }
            that.setState({ questionList:questions });
            if( fireSocketEvent ){
                // to avoid missing upvotes/downvotes, send inc/dec event only
                sockData = {
                    qId: qId, vote : vote
                }
                that.notiSocket.emit('questionVoteUpdated', sockData );
            }
        }


    }

    voteQuestion( qId, vote ){
        let data = {
            videoId: this.state.videoId,
            qId: qId,
            vote: vote
        }
        var that = this;
        requests.voteQuestion( data ).then( function ( resolve ) {
            that.onVoteQuestionSuccess( qId, vote );
        }, function ( reject ) {

        });
    }

    handleAskQuestion(){
        const { cookies } = this.props
        var that = this;

        let data = {
            videoId: this.state.videoId,
            question: this.state.question
        }

        requests.saveQuestion(data).then(
            function ( resolve ) {
                var qData = resolve;
                qData.question = data.question;
                //that.notiSocket.emit('questionAdded', qData);
                console.log( qData );
                var questions = that.state.questionList;
                console.log(questions);
                questions.push( qData );

                console.log(questions);
                that.setState({ questionList:questions });
                that.notiSocket.emit('questionAdded', qData);
            }
        );
    }

    askQuestionChange(event,newValue){
        this.setState({question:newValue});
    };

    generateQuesList(){
        //console.log( this.state.questionList );
        var that = this;

        if( this.state.questionList.length > 0 ) {
            var quesList = this.state.questionList.map(function (item,index) {
                return <div key={item._id}>
                    <ListItem primaryText={item.question} disabled={true}/>
                    <IconButton tooltip={VOTE_TYPES.UPVOTE} onClick={that.voteQuestion.bind( this, item._id, VOTE_TYPES.UPVOTE )} >
                        <ThumbsUpIcon />
                    </IconButton >
                    {item.upvote}
                    <IconButton tooltip={VOTE_TYPES.DOWNVOTE} onClick={that.voteQuestion.bind( this, item._id, VOTE_TYPES.DOWNVOTE ) } >
                        <ThumbsDownIcon />
                    </IconButton >
                    {item.downvote}
                    <hr className="hr-primary" />
                </div>
            })
            //console.log( quesList );
            return quesList;
        }
    }

    generateProfileDesc() {
        var that = this;

        if (Utils.isNonEmptyObject(this.state.userInfo) ) {
            return ( <UserCard userInfo={this.state.userInfo} videoData={this.state.seminarData}/> )
        } else {
            return ( <div></div> )
        }
    }

    render(){
        return (
            <div className="seminarSM-page">
                <div className="main-container">
                    <div className="prof-desc col-sm-12">
                        {this.generateProfileDesc()}
                    </div>
                    <div className="seminar-left-coloumn col-sm-12 col-md-8">
                            <p>
                                {this.state.message}
                            </p>
                            <div className="youtube-embed">
                                <iframe width={this.state.youtubeOpts.width} height={this.state.youtubeOpts.height} src={this.state.youtubeOpts.url} frameBorder="0" gesture="media" allowFullScreen></iframe>
                            </div><br />
                        <TextField
                            hintText="Type a question"
                            floatingLabelText="Question"
                            floatingLabelFixed={true}
                            type="text"
                            multiLine={true}
                            onChange={this.askQuestionChange}
                            value={this.state.question}
                        />
                        <FlatButton className="control-btn" label='ask' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleAskQuestion.bind(this)} target="_blank"/>
                    </div>
                    <div className="seminar-right-coloumn  col-sm-8 col-md-4 pre-scrollable">

                        <div className="sQuestion-list">
                            <List>
                                <Subheader>Question asked by community</Subheader>
                                {this.generateQuesList()}
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



}
/*

const mapStateToProps = (state) =>({showDialog:state.login.showDialog,email:state.login.email,password:state.login.password});
const mapDispatchToProps = (dispatch)=>({
    handleLoginOnClick:function(){
        dispatch(showLoginDialog());
    },
    handleEmailChange:function(event,newValue){
        dispatch(setEmail(newValue))
    },
    handlePasswordChange:function(event,newValue){
        dispatch(setPassword(newValue))
    }

})

export default connect(mapStateToProps,mapDispatchToProps)( withCookies( SeminarSM ) )*/

export default withCookies( SeminarSM );