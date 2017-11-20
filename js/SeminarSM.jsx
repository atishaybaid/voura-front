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

import { withCookies, Cookies } from 'react-cookie';
import  {connect} from 'react-redux';

//@todo fetch sem data on load itself
//@todo identify states
class SeminarSM extends Component {

    constructor(props) {
        super( props );
        this.state = {
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
            console.log( data );
            var that = this;
            var path ='questions/votecount/';

            var promise = new Promise( function ( resolve, reject ) {
                PostReq( path, data )
                    .then(function (response) {
                        console.log(response.status);
                        if(response.status == 200){
                            //that.setState( { questionList: response.data.data } ) ;
                            resolve( response.data.data );
                        } else {
                            reject( response );
                        }

                    })
                    .catch(function (error) {
                        reject( error );
                        console.log(error);
                    });
            });
            return promise;
        }

    getQuestions(){
        const { cookies } = this.props
        const userId = cookies.get('userId');

        let data = {
            videoId: this.state.videoId,
            user: userId
        }
        var that = this;
        var path ='questions/questions/?videoid='+data.videoId;
        var promise = new Promise( function ( resolve, reject ) {
            GetReq( path )
                .then(function (response) {
                    console.log(response.status);
                    if(response.status == 200){
                        //that.setState( { questionList: response.data.data } ) ;
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

    getQuestionList( qArray, vArray ){
        var rArray = [];
        qArray.forEach( function ( qObj ) {
            qObj.score = 0;
            let obj = vArray.find( function( vObj ){ if( vObj.qId == qObj["_id"] ) return vObj.qId; else return {}; } );

            if( obj )
                qObj.score = obj.score;
            rArray.push( qObj );
        })
        return rArray;
    }

    componentDidMount(){
        var that = this;
        Promise.all( [ that.getQuestions(), that.getVoteCounts() ] )
            .then(  function ( allData ) {
                var questions = that.getQuestionList( allData[0], allData[1] )
                that.setState({ questionList:questions });
                that.socketHandling();
            })


    }

    voteQuestion( qId, vote ){
        let data = {
            videoId: this.state.videoId,
            qId: qId,
            vote: vote
        }
        //console.log( data );
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

    handleAskQuestion(){
        const { cookies } = this.props
        const userId = cookies.get('userId');

        let data = {
            videoId: this.state.videoId,
            question: this.state.question,
            user: userId
        }

        var path ='questions/save';
        var that = this;
        PostReq( path, data )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    if( response.data.status != 'ERROR' ){

                        var qData = response.data.data;
                        qData.question = data.question;
                        //that.notiSocket.emit('questionAdded', qData);
                        that.notiSocket.emit('questionAdded', qData);
                    }
//                    console.log( response );
                    console.log( qData );
                    var questions = that.state.questionList;
                    questions.push( qData );
                    that.setState({ questionList:questions });

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
        //console.log( this.state.questionList );
        var that = this;
        var quesList = this.state.questionList.map( function( item ){
            return <div key ={item._id}>
                <ListItem primaryText={item.question} />
                <FlatButton className="control-btn" label='upvote' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={that.voteQuestion.bind( this, item._id, 'upvote' ) } target="_blank"/>
                <FlatButton className="control-btn" label='downvote' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={that.voteQuestion.bind( this, item._id, 'downvote' ) } target="_blank"/>
            </div>
        } )
        //console.log( quesList );
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

export default connect(mapStateToProps,mapDispatchToProps)( withCookies( SeminarSM ) )