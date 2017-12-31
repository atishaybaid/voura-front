import React ,{ Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import axios from 'axios';
import iVCommonUtils from './utils/common';
//import {iVConfigs} from '../Configs/local.js';
import iVConfigs from '../Configs/local.json';
import { withCookies, Cookies } from 'react-cookie';
import Dialog from 'material-ui/Dialog';
import QuestionList from './QuestionList.jsx';
import Utils from './utils/common.js';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import requests from './utils/requests';
import TagBox from './TagBox';

class Seminar extends Component {
    constructor(props){

        super( props );
        var videoId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        this.state ={
            videoId: videoId,
            title:'',
            titleErrorText:'',
            description: '',
            descErrorText: '',
            tags: '',
            startDate: new Date(),
            startTime: new Date(),
            endDate: new Date(),
            endTime: new Date(),
            thumbnail:'',
            freeQuests: [],
            showPickQuestDialog: false,
            msgBarText : '',
            semData : {}
        };
        this.SEM_INPUT_FIELDS_ERROR_TEXT = {
            TITLE : "please provide title for seminar",
            DESC: "please provide desc for seminar"
        };
        this.showPickQuestionsDialog = this.showPickQuestionsDialog.bind(this);
        this.hidePickQuestionsDialog = this.hidePickQuestionsDialog.bind(this);
        this.showSelectedQuesList = this.showSelectedQuesList.bind(this);
        this.pickQuestions = this.pickQuestions.bind(this);
        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onDescBlur = this.onDescBlur.bind(this);
        this.getMsgBarContent = this.getMsgBarContent.bind(this);
        this.addRemoveQuestionAfterListClick = this.addRemoveQuestionAfterListClick.bind(this);
        this.prepareState = this.prepareState.bind(this);
        this.getCreateUpdateButton = this.getCreateUpdateButton.bind(this);
        this.createSeminar = this.createSeminar.bind(this);
        this.updateSeminar = this.updateSeminar.bind(this);
        this.deleteSeminar = this.deleteSeminar.bind(this);
    };

    getQuestions(){
        let data = {
            videoId: this.state.videoId
        }
        return requests.getQuestionsForVideo(data);
    }

    setQuestsAsSelected( quests ){

        if( quests.length > 0 ){
            quests.forEach( function( q ){
                q.selected = true;
            } );
        }
        return quests;
    }

    prepareState( allData ){
        var quests = this.setQuestsAsSelected( allData[0] );
        var semData = allData[1];
        //var event = allData[2];
        //this.setState({ title: event.title, description: event.description, tags: event.tags, startDate: event.startDate, startTime: event.startTime, endDate: event.endDate, endTime: event.endTime, freeQuests: quests, semData: semData});
        this.setState({ title: semData.broadcast.resource.snippet.title, description: semData.broadcast.resource.snippet.description, tags: semData.tags, startDate: new Date( semData.broadcast.resource.snippet.scheduledStartTime ), startTime: new Date( semData.broadcast.resource.snippet.scheduledStartTime ), endDate: new Date( semData.broadcast.resource.snippet.scheduledEndTime ), endTime: new Date( semData.broadcast.resource.snippet.scheduledEndTime ), freeQuests: quests, semData: semData});
    }

    getDummyEventData(){
        return {
            "_id" : "Bk3RJQigz",
            "videoId" : "B1lhRkXiez",
            "mType" : "SEMINAR",
            "mReq" : "MODERATE",
            "from" : 1511973023000,
            "to" : 1512063023000,
            "description" : "u2semdesc",
            "tags" : [
                "mongodb",
                "redis"
            ],
            "aTags" : [],
            "requestor" : 0,
            "requestee" : 2,
            "state" : "ACCEPTED",
            "createdAt" : 1511890899767,
            "updatedAt" : 1511890899767
        };
    }

    componentDidMount() {
        var that = this;
        var semObj = {videoId: this.state.videoId};
        if( this.state.videoId ) {
            Promise.all([that.getQuestions(), requests.fetchSeminarData(semObj), /* fetchEventData*/])
                .then(function (allData) {
                    console.log(allData);
                    //allData[2] = that.getDummyEventData();
                    that.prepareState(allData);
                })
        }

    }

    pickQuestions( quests ){

        var questions = this.state.freeQuests;
        if( quests.length > 0 ){
            quests.forEach( function( q ){
                questions.push( q );
            } );
        }
        this.setState({ showPickQuestDialog: false, freeQuests:questions });
    }

    onTitleBlur( ){
        var errorText;
        if( Utils.isEmpty( this.state.title ) ){
            errorText = this.SEM_INPUT_FIELDS_ERROR_TEXT.TITLE;
        } else {
            errorText = ""
        }
        this.setState({ titleErrorText:errorText })
    }

    onDescBlur( ){
        var errorText;
        if( Utils.isEmpty( this.state.desc ) ){
            errorText = this.SEM_INPUT_FIELDS_ERROR_TEXT.DESC;
        } else {
            errorText = ""
        }
        this.setState({ descErrorText:errorText })
    }

    handleTitleChange(event,newValue){
        this.setState({title:newValue});
    };

    handleDescriptionChange(event,newValue){
        this.setState({description:newValue});
    };

    handleStartDate(event,newValue){
        this.setState({startDate:newValue});
    };
    handleStartTime(event,newValue){
        this.setState({startTime:newValue});
    };
    handleEndDate(event,newValue){
        this.setState({endDate:newValue});
    };
    handleEndTime(event,newValue){
        this.setState({endTime:newValue});
    };

    getSelectedTags( tags ){
        this.setState({ tags: tags });
    }

    getMessageBarText( type ){
        switch( type ){
            case 'create':
                return (
                    <span className="highlight"> Seminar created. please <a href={ Utils.getSeminarForPUrl( this.state.semData.videoId )}> visit here </a> </span>
                )
            case 'create_failed':
                return (
                    <span className="highlight"> Seminar creation failed at this moment. We are looking into it. please visit after some time </span>
                )
            case 'update':
                return (
                    <span className="highlight"> Seminar updated. please <a href={ Utils.getSeminarForPUrl( this.state.semData.videoId )}> visit here </a> </span>
                )
            case 'update_failed':
                return (
                    <span className="highlight"> Seminar updation failed at this moment. We are looking into it. please visit after some time </span>
                )
            case 'delete':
                return (
                    <span className="highlight"> Seminar deleted.</span>
                )
            default:
                return null;
        }

    }

    createSeminar( ){

        const { cookies } = this.props
        const userId = cookies.get('userId');
        const that = this;

        var selectedFreeQuestsIds = Utils.getSelectedQuestionsIds( this.state.freeQuests );
        let data = {
            "requestee": userId,
            "bTags": this.state.tags ,
            "bTitle": this.state.title,
            "bDescription" : this.state.description,
            "bStartDateTime": iVCommonUtils.mergeDateTime( this.state.startDate, this.state.startTime ),
            "bEndDateTime": iVCommonUtils.mergeDateTime( this.state.endDate, this.state.endTime ),
            "qIds" : selectedFreeQuestsIds
        };
        requests.createSeminar(data)
            .then( function ( resolve ) {
                console.log('sem created');
                that.setState( {semData: resolve, msgBarText: this.getMessageBarText('create') } );
            }, function (reject) {
                console.log('sem rejected');
                that.setState( {msgBarText: this.getMessageBarText('create_failed') } );
            });

    };
    
    showPickQuestionsDialog(){
        this.setState({ showPickQuestDialog: true });
    }

    hidePickQuestionsDialog(){
        this.setState({ showPickQuestDialog: false });
    }

    addRemoveQuestionAfterListClick(){
        let qList = this.state.freeQuests;
        var newState = !qList[index].selected;
        qList[index].selected = newState;
        this.setState({freeQuests:qList});
    }

    addRemoveQuestion( index, event, checked ){
        let qList = this.state.freeQuests;
        qList[index].selected = checked;
        this.setState({freeQuests:qList});
    }

    showSelectedQuesList(){
        //console.log( this.state.questionList );
        var that = this;
        var quesList = '';
        if( Utils.isNonEmptyArray( this.state.freeQuests )  ) {
            var quesList = this.state.freeQuests.map(function (item, index) {
                return <div key={`selectedQuest.quest_${index}`}>
                    <ListItem primaryText={item.question} onClick={that.addRemoveQuestionAfterListClick.bind(that, index)} leftCheckbox={<Checkbox checked={ item.selected }
                        onCheck={that.addRemoveQuestion.bind(that, index)}
                        style={{marginBottom: 16}} />}/>
                    <hr className="hr-primary"/>
                </div>
            })
        }
        //console.log( quesList );
        return quesList;
    }

    getSubheaderText(){
        var text = '';
        if( Utils.isNonEmptyArray( this.state.freeQuests ) ){
            text = 'Questions selected by you for seminar'
        } else {
            text = "You haven't selected questions for seminar. It's better to have initial set of questions to start with, which you can select by clicking 'pick questions for seminar button'."
        }
        return text;
    }

    getMsgBarContent(){
        return this.state.msgBarText;
    }

    getCreateUpdateButton(){
        if( Utils.isEmpty( this.state.semData ) ){
            return (
                <FlatButton className="landing-btn" label="Create seminar" primary={true}
                            backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.createSeminar.bind(this)}
                            target="_blank"/>
            )
        } else {
            return (
                <FlatButton className="landing-btn" label="Update seminar" primary={true}
                            backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.updateSeminar.bind(this)}
                            target="_blank"/>
            );
        }
    }
    
    updateSeminar(){
        const that = this;
        var selectedFreeQuestsIds = Utils.getSelectedQuestionsIds( this.state.freeQuests );
        let data = {
            "videoId" : this.state.videoId,
            "bTags": this.state.tags ,
            "bTitle": this.state.title,
            "bDescription" : this.state.description,
            "bStartDateTime": iVCommonUtils.mergeDateTime( this.state.startDate, this.state.startTime ),
            "bEndDateTime": iVCommonUtils.mergeDateTime( this.state.endDate, this.state.endTime ),
            "qIds" : selectedFreeQuestsIds
        };
        requests.updateSeminar(data)
            .then( function ( resolve ) {
                that.setState( {msgBarText: this.getMessageBarText('update') } );
            }, function (reject) {
                that.setState( {msgBarText: this.getMessageBarText('update_failed') } );
            });
    }
    deleteSeminar(){
        let data = {
            "videoId": this.state.videoId
        }
        requests.deleteSeminar( data )
            .then( function ( resolve ) {
                that.setState( {msgBarText: this.getMessageBarText('delete') } );
            }, function (reject) {
                that.setState( {msgBarText: this.getMessageBarText('delete_failed') } );
            });
    }

    getDeleteButton(){
        if( !Utils.isEmpty( this.state.semData ) ){
            return (
                <FlatButton className="landing-btn" label="Delete seminar" primary={true}
                            backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.deleteSeminar.bind(this)}
                            target="_blank"/>
            );
        }
    }

    render(){
        return(
            <div className="seminar-create-page">
                <div className="main-container container">
                    <div className="seminar-create-container">
                        <div className="row">
                            <div className="col-md-10">
                        <TextField
                            hintText="Title"
                            errorText={this.state.titleErrorText}
                            type="text"
                            onChange={this.handleTitleChange.bind(this)}
                            value={this.state.title}
                            onBlur={this.onTitleBlur}
                            fullWidth={true}
                        />
                                </div>
                            </div>
                        <div className="row">
                            <div className="col-md-10">
                        <TextField
                            hintText="Description"
                            errorText={this.state.descErrorText}
                            type="text"
                            onChange={this.handleDescriptionChange.bind(this)}
                            value={this.state.description}
                            multiLine={true}
                            rows={2}
                            onBlur={this.onDescBlur}
                            fullWidth={true}
                        />
                                </div>
                            </div>
                        <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)} tags={this.state.tags}/><br/>
                        <div className="row">
                            <div className="col-md-3">
                                <span className="h4"> seminar start date-time</span>
                                </div>
                            <div className="col-md-2">
                        <DatePicker onChange={this.handleStartDate.bind(this)} value ={this.state.startDate} hintText="Seminar start date" />
                                </div>
                            <div className="col-md-2 col-md-offset-1">
                        <TimePicker onChange={this.handleStartTime.bind(this)} value={this.state.startTime} hintText="Seminar start time" />
                                </div>
                            </div>
                        <div className="row">
                            <div className="col-md-3">
                                <span className="h4"> seminar end date time</span>
                            </div>
                            <div className="col-md-2">
                        <DatePicker onChange={this.handleEndDate.bind(this)} value ={this.state.endDate} hintText="Seminar end date" />
                                </div>
                            <div className="col-md-2 col-md-offset-1">
                        <TimePicker onChange={this.handleEndTime.bind(this)} value={this.state.endTime} hintText="Seminar end time" />
                                </div>
                         </div>
                        <div className="row">
                            <div className="col-md-6">
                        <FlatButton className="landing-btn" label="Pick questions for seminar" primary={true}
                                    backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.showPickQuestionsDialog}
                                    target="_blank"/>
                                </div>
                        </div>
                        <Dialog
                            title=""
                            actions={null}
                            open={this.state.showPickQuestDialog}
                            onRequestClose={this.hidePickQuestionsDialog}
                            autoScrollBodyContent={true}
                        >
                        <QuestionList pickQuestion={(q)=>this.pickQuestions(q)}></QuestionList>
                        </Dialog>
                        <List>
                            <div className="highlight">{this.getSubheaderText()}</div>
                            {this.showSelectedQuesList()}
                        </List>

                        <div className="row">
                            <div className="col-md-6">
                                {this.getCreateUpdateButton()}
                                </div>
                            <div className="col-md-6">
                                {this.getDeleteButton()}
                            </div>
                    </div>
                        </div>
                    <div className="row">
                    <div className="msg-bar">
                        {this.getMsgBarContent()}
                    </div>
                        </div>
                </div>
            </div>
        )
    }

}

export default withCookies( Seminar );