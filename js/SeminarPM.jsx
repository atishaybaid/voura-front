import React ,{ Component } from 'react';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import '../less/SeminarPM.less';
import {GetReq, PostReq} from './utils/apiRequest.jsx';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import { withCookies, Cookies } from 'react-cookie';
import iVConfigs from '../Configs/local.json';
import io from "socket.io-client";
import Snackbar from 'material-ui/Snackbar';
import Utils from './utils/common.js';
import UserCard from './UserCard';
import requests from './utils/requests';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui/svg-icons/action/check-circle';
import SkipIcon from 'material-ui/svg-icons/action/visibility-off';

//@todo fetch sem data on load itself
//@todo identify states
class SeminarPM extends Component {
    constructor(props) {
        super();
        var videoId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        var epoch = Math.round((new Date()).getTime() / 1000);
        this.state = {
            semState: 'FETCH_DATA',
            streamState: '',
            videoId: videoId,
            userInfo: {},
            seminarData: {},
            ctrlMessage: 'Press to fetch data',
            question: '',
            questionList: [],
            showSnackBar: false,
            snackBarMessage : "",
            streamIdText: "",
            liveSeminarEpoch: epoch
        };

        this.skipQuestion = this.skipQuestion.bind(this);
        this.answeredQuestion = this.answeredQuestion.bind(this);
        this.generateQuesList = this.generateQuesList.bind(this);
        this.removeQuestion =this.removeQuestion.bind(this);
        this.getDataForSemControls = this.getDataForSemControls.bind( this );
        this.generateSemControls = this.generateSemControls.bind(this);
        this.previewSeminar = this.previewSeminar.bind(this);
        this.liveSeminar = this.liveSeminar.bind(this);
        this.closeSeminar = this.closeSeminar.bind(this);
        this.thanksSeminar = this.thanksSeminar.bind(this);
        this.getTransitionData= this.getTransitionData.bind(this);
        this.getStreamStatus= this.getStreamStatus.bind(this);
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

    }

    fetchSeminarData(){
        var path ='seminar/?videoId='+this.state.videoId;
        var that = this;
        var promise = new Promise( function ( resolve, reject ) {
            GetReq( path )
                .then(function (response) {
                    console.log(response.status);
                    if(response.status == 200){
                        resolve( response.data.data );
                    } else {
                        reject( response );
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    return error;
                });
        });
        return promise;
    }

    getTopQuestions( limit=1){

        var path ='questions/topquestion/?videoid='+this.state.videoId+'&n='+limit;
        var that = this;
        var promise = new Promise( function ( resolve, reject ) {
            GetReq( path )
                .then(function (response) {
                    console.log(response.status);
                    if(response.status == 200 && response.data.status != 'ERROR' ){
                        resolve( response.data.data );
                    } else {
                        resolve( [] );
                    }

                })
                .catch(function (error) {
                    reject( error );
                    console.log(error);
                });
        }); 
        return promise;
    }

    getQidArrFromQuestions( qArr ){
        var qIds = [];
        qArr.forEach( function( quest ){
            qIds.push( quest._id );
        } );
        return qIds;
    }

    decideStateBasedOnSeminarData( semData ){

        try{
            var lifeCycleStatus = semData.binding.status.lifeCycleStatus;
        }catch(e){
            var lifeCycleStatus = 'PREVIEW_SEMINAR';
        }

        switch( lifeCycleStatus ){
            case 'ready':
                return 'PREVIEW_SEMINAR';
                break;
            case 'testing':
            case 'testStarting':
                return 'LIVE_SEMINAR';
                break;
            case 'live':
            case 'liveStarting':
                return 'COMPLETE_SEMINAR';
                break;
            case 'complete':
                return 'THANKS_SEMINAR';
                break;
            default:
                return 'FETCH_DATA';
                break;
        }

        return 'PREVIEW_SEMINAR';
    }

    componentDidMount(){
        var that = this;
        Promise.all( [ that.fetchSeminarData(), that.getTopQuestions( 3 ), requests.getUserInfo() ] )
            .then(  function ( allData ) {
                var newSemState = that.decideStateBasedOnSeminarData( allData[0] );

                //var questions = that.getQuestionList( allData[0], allData[1] )
                var streamIdText ="";
                try{
                    streamIdText = "Your stream id/name for OBS is :" + allData[0].stream.resource.cdn.ingestionInfo.streamName;
                }catch (  e ){
                    streamIdText = "Could not find stream id for your broadcast";
                };

                that.setState( { semState: newSemState, seminarData: allData[0], questionList: allData[1], streamIdText : streamIdText, userInfo: allData[2]  } );
                that.socketHandling();
                //that.notiSocket.emit('removeQuestion', that.getQidArrFromQuestions( allData[1] ) );
            }).catch( function (error) {
            console.log('caught errror in comp mount');
            console.log( error );
        })
    }

    //just remove qid from qarray
    deleteQuestion( qArray, qId ){
        for(var i = 0; i < qArray.length; i++) {
            if(qArray[i]._id == qId ) {
                qArray.splice(i, 1);
                break;
            }
        }
        return qArray;
    }

    removeQuestion( questions, qId ){
        questions = this.deleteQuestion( questions, qId );
        var qArr = [];
        qArr.push(qId);
        this.notiSocket.emit('removeQuestion', qArr);
        return questions;
    }

    skipQuestion( qId ){
        //@todo api hit that question si skipped
        var questions = this.state.questionList;
        questions = this.removeQuestion( questions, qId );
        var that = this;
        this.getTopQuestions(1).then( function ( resolve ) {
            if( resolve.length > 0 ){
                questions.push( resolve[0] );
                that.setState({ questionList: questions});
            }
        });
    }

    setAnswered( qId, timeDiff ){

        const { cookies } = this.props
        const userId = cookies.get('userId');

        let data = {
            videoId: this.state.videoId,
            qId: qId,
            answered: true,
            time: timeDiff
        }

        var path ='questions/status';
        var that = this;

        PostReq( path, data )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    if( response.data.status != 'ERROR' ){
                        console.log( response );
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    answeredQuestion( qId ){
        //@todo api hit that question si answered
        var questions = this.state.questionList;
        var epoch = this.state.liveSeminarEpoch;
        if( !epoch ){
            var epoch = Math.round((new Date()).getTime() / 1000);
        }
        var nowEpoch = Math.round((new Date()).getTime() / 1000);;

        questions = this.removeQuestion( questions, qId );
        var that = this;
        this.getTopQuestions(1).then( function ( resolve ) {
            if( resolve.length > 0 ){
                questions.push( resolve[0] );
                that.setState({ questionList: questions});
                var timeDiff = nowEpoch - epoch;
                that.setAnswered( qId, timeDiff );
            }
        });
    }

    generateQuesList(){
        console.log( this.state.questionList );
        var that = this;
        if( this.state.questionList.length > 0 ) {
            var quesList = this.state.questionList.map(function (item) {
                return <div key={item._id}>
                    <ListItem primaryText={item.question} disabled={true}/>
                    <IconButton tooltip='answered' onClick={that.answeredQuestion.bind( this, item._id )} >
                        <DoneIcon />
                    </IconButton >
                        <IconButton tooltip='skip' onClick={that.skipQuestion.bind( this, item._id )} >
                            <SkipIcon />
                        </IconButton >
                    <hr class="hr-primary" />
                </div>
            })
            //console.log( quesList );
            return quesList;
        }
    }

    getStreamStatusData(){
        const { cookies } = this.props;

        const userId = cookies.get('userId');
        let data = {
            "userID": userId,
            "stream": {
                "id": this.state.seminarData.stream.id
            }
        }
        return data;
    }

    getStreamStatus(){
        console.log('stream status');
        var data = this.getStreamStatusData();
        var path = 'seminar/stream/status';
        var that = this;

        var promise = new Promise( function ( resolve, reject ) {
            PostReq(path, data)
                .then(function (response) {
                    console.log(response.status);
                    if (response.status == 200 && response.data.status != 'ERROR') {
                        //that.setState( { questionList: response.data.data } ) ;
                        //that.setState({streamState: 'OK_STREAM'});
                        resolve( response.data.data );
                    } else {
                        if (response.data.status == 'ERROR')
                            reject( response.data );
                        else
                            reject( response.data );

                        //that.setState({streamState: 'BAD_STREAM'});

                        console.log(error);
                    }
                })
                .catch(function (error) {
                    reject( error );
                    console.log(error);
                });
        });
        return promise;

    }

    getTransitionData(){
        const { cookies } = this.props;

        const userId = cookies.get('userId');
        let data = {
            "userID": userId,
            "broadcast": {
                "id": this.state.seminarData.broadcast.id
            }
        }
        return data;
    }

    processStreamData( streamObj ){
        var retObj = {};
        retObj.status = 'SUCCESS';
        return retObj;

        var streamStatus = streamObj.status.healthStatus.status;
        switch ( streamStatus ){
            case 'noData':
                retObj.status = 'FAILED';
                retObj.snackBarMessage = 'Not getting data from your stream';
                retObj.showSnackBar = true;
                break;
            case 'good':
                retObj.status = 'SUCCESS';
                retObj.snackBarMessage = 'Stream status is good';
                retObj.showSnackBar = true;
                break;
            default:
                break;
        }
        return retObj;
    }

    previewSeminar(){
        console.log('preview');
        //check stream status and hit preview api
        var data = this.getTransitionData();
        var path = 'seminar/preview';
        var that = this;
        this.getStreamStatus().then( function( resolve ){

            //check if we should proceed or not acc to stream sttus otherwise show error msg
            var retObj = that.processStreamData( resolve );
            if( retObj.status == 'FAILED' ){
                that.setState({ snackBarMessage: retObj.snackBarMessage, showSnackBar:retObj.showSnackBar });
                return ;
            }


            PostReq( path, data )
                .then(function (response) {
                    console.log(response.status);
                    if(response.status == 200 && response.data.status != 'ERROR' ){
                        //that.setState( { questionList: response.data.data } ) ;
                        that.setState({ semState: 'LIVE_SEMINAR', snackBarMessage: 'preview successful', showSnackBar:true });
                    }else{
                        if( response.data.status == 'ERROR' )
                            var msg = response.data.message;
                        else
                            var msg = 'network error: preview failed';

                        that.setState({ snackBarMessage: msg, showSnackBar:true });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }, function( reject ){
            var msg = "your stream status is not healty. please check your stream";
            that.setState({ snackBarMessage: msg, showSnackBar:true });
        } );

    }

    liveSeminar(){
        console.log('live');
        var path = 'seminar/live';
        var data = this.getTransitionData();
        var that = this;
        PostReq( path, data )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200 && response.data.status != 'ERROR' ){
                    //that.setState( { questionList: response.data.data } ) ;
                    var epoch = Math.round((new Date()).getTime() / 1000);
                    that.setState({ semState: 'COMPLETE_SEMINAR', snackBarMessage: 'live successful', showSnackBar:true, liveSeminarEpoch: epoch });
                }else{
                    if( response.data.status == 'ERROR' )
                        var msg = response.data.message;
                    else
                        var msg = 'network error: live failed';

                    that.setState({ snackBarMessage: msg, showSnackBar:true });
                    console.log(msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    closeSeminar(){
        console.log('close');
        var path = 'seminar/complete';
        var data = this.getTransitionData();
        var that = this;
        PostReq( path, data )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200 && response.data.status != 'ERROR' ){
                    //that.setState( { questionList: response.data.data } ) ;
                    that.setState({ semState: 'THANKS_SEMINAR' });
                } else {
                    if( response.data.status == 'ERROR' )
                        var msg = response.data.message;
                    else
                        var msg = 'network error: close failed';

                    that.setState({ snackBarMessage: msg, showSnackBar:true });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    thanksSeminar(){
        console.log('close');
    }

    //@todo include error controls
    getDataForSemControls( stateObj ){

        var semData = {};
        switch( stateObj.semState ){
            case 'FETCH_DATA':
                semData.msg = 'Fetching your seminar data. Please be patient.';
                break;
            case 'PREVIEW_SEMINAR':
                semData.msg = 'You can preview your seminar by clicking: ';
                semData.btnLabel ='Preview';
                semData.fn = this.previewSeminar;
                break;
            case 'LIVE_SEMINAR':
                semData.msg = 'You can live your seminar by clicking: ';
                semData.btnLabel ='Live';
                semData.fn = this.liveSeminar;
                break;
            case 'COMPLETE_SEMINAR':
                semData.msg = 'You can close your seminar by clicking: ';
                semData.btnLabel ='Close';
                semData.fn = this.closeSeminar;
                break;
            case 'THANKS_SEMINAR':
                semData.msg = 'Thanks for providing the seminar';
                break;
            default:
                semData.msg = 'Fetching your seminar data. Please be patient.';
                break;
        }

        return semData;
    }

    generateSemControls(){

        var semData = this.getDataForSemControls( this.state );
        return <div className="sem-controller panel panel-default">

                <div class = "panel-body">
                    <p>{this.state.streamIdText}</p>
                { semData.msg }
            { semData.btnLabel ?
                ( <FlatButton className="control-btn" label={semData.btnLabel} primary={true}
                        backgroundColor={'#4ebcd5'} style={{color:'#ffffff'}}
                        onClick={ semData.fn.bind(this) } target="_blank"/> )
                : null
            }
                    </div>
        </div>

    }

    generateProfileDesc() {
        var that = this;

        if (Utils.isNonEmptyObject(this.state.userInfo) && Utils.isNonEmptyObject(this.state.seminarData)) {
            return ( <UserCard userInfo={this.state.userInfo} videoData={this.state.seminarData}/> )
        } else {
            return ( <div></div> )
        }
    }

    render(){
        return (
            <div className="seminarP-page">
                <div className="main-container">
                    <div className="prof-desc col-sm-12">
                        {this.generateProfileDesc()}
                    </div>
                    <div className="topMsg col-sm-12">
                        {this.generateSemControls()}
                    </div>

                    <div className="seminar-left-coloumn col-sm-12 col-md-8">
                        <div className="youtube-embed">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/WOoJh6oYAXE" frameBorder="0" gesture="media" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="seminar-right-coloumn col-sm-8 col-md-4 pre-scrollable">
                        <div className="pQuestion-list">
                            <Subheader>Pick your questions</Subheader>
                            {this.generateQuesList()}
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={this.state.showSnackBar}
                    message={this.state.snackBarMessage}
                    autoHideDuration={2000}
                />
            </div>
        )
    }

}

export default withCookies( SeminarPM );