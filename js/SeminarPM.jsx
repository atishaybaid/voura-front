import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
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

//@todo fetch sem data on load itself
//@todo identify states
class SeminarPM extends Component {
    constructor(props) {
        super();
        var videoId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        this.state = {
            semState: 'FETCH_DATA',
            streamState: '',
            videoId: videoId,
            seminarData: {},
            ctrlMessage: 'Press to fetch data',
            question: '',
            questionList: [],
            showSnackBar: false,
            snackBarMessage : ""
        }
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
                    reject( error );
                    console.log(error);
                });
        });
        return promise;
    }

    getTopQuestions( limit=1){

        var path ='questions/topquestion/?videoid='+this.state.videoId+'&limit='+limit;
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
        return 'PREVIEW_SEMINAR';
    }

    componentDidMount(){
        var that = this;
        Promise.all( [ that.fetchSeminarData(), that.getTopQuestions( 3 ) ] )
            .then(  function ( allData ) {
                var newSemState = that.decideStateBasedOnSeminarData( allData[0] );

                //var questions = that.getQuestionList( allData[0], allData[1] )
                var arr =[];
                if( typeof allData[1] == 'object' ){
                    arr.push( allData[1] ) ;
                } else if( allData[1] instanceof Array ){
                    arr = allData[1];
                }

                that.setState( { semState: newSemState, seminarData: allData[0], questionList: arr } );
                that.socketHandling();
                that.notiSocket.emit('removeQuestion', that.getQidArrFromQuestions( arr ) );
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
            questions.push( resolve );
            that.setState({ questionList: questions});
        });
    }

    answeredQuestion( qId ){
        //@todo api hit that question si answered
        var questions = this.state.questionList;
        questions = this.removeQuestion( questions, qId );
        var that = this;
        this.getTopQuestions(1).then( function ( resolve ) {
            questions.push( resolve );
            that.setState({ questionList: questions});
        });
    }

    generateQuesList(){
        console.log( this.state.questionList );
        var that = this;
        if( this.state.questionList.length > 0 ) {
            var quesList = this.state.questionList.map(function (item) {
                return <div key={item._id}>
                    <ListItem primaryText={item.question}/>
                    <FlatButton className="control-btn" label='answered' primary={true} backgroundColor={'#4ebcd5'}
                                style={{color:'#ffffff'}} onClick={that.answeredQuestion.bind( this, item._id ) }
                                target="_blank"/>
                    <FlatButton className="control-btn" label='skip' primary={true} backgroundColor={'#4ebcd5'}
                                style={{color:'#ffffff'}} onClick={that.skipQuestion.bind( this, item._id ) }
                                target="_blank"/>
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
            "broadcast": {
                "id": this.state.seminarData.broadcast.id
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
        var streamStatus = streamObj.status.healthStatus.status;
        switch ( streamStatus ){
            case 'noData':
                retObj.status = 'FAILED';
                retObj.snackBarMessage = 'Not getting data from your stream';
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

                        console.log(error);
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
                    that.setState({ semState: 'COMPLETE_SEMINAR', snackBarMessage: 'live successful', showSnackBar:true });
                }else{
                    if( response.data.status == 'ERROR' )
                        var msg = response.data.message;
                    else
                        var msg = 'network error: live failed';

                    that.setState({ snackBarMessage: msg, showSnackBar:true });
                    console.log(error);
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
        return <div className="sem-controller">
            <p>
                { semData.msg }
            </p>
            { semData.btnLabel ?
                ( <FlatButton className="control-btn" label={semData.btnLabel} primary={true}
                        backgroundColor={'#4ebcd5'} style={{color:'#ffffff'}}
                        onClick={ semData.fn.bind(this) } target="_blank"/> )
                : null
            }
        </div>

    }
    

    render(){
        return (
            <div className="seminarP-page">
                <VrHeader />
                <div className="main-container">
                    <div className="seminar-left-coloumn">
                        {this.generateSemControls()}
                        <div className="youtube-embed">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/WOoJh6oYAXE" frameBorder="0" gesture="media" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="seminar-right-coloumn">
                        <div className="pQuestion-list">
                            <Subheader>Your questions</Subheader>
                            {this.generateQuesList()}
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={this.state.showSnackBar}
                    message={this.state.snackBarMessage}
                    autoHideDuration={1000}
                />
            </div>
        )
    }

}

export default withCookies( SeminarPM );