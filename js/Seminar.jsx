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

        super();
        this.state ={
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
    };

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

    handleSubmit(event,newValue){

        const { cookies } = this.props
        const userId = cookies.get('userId');
        const that = this;

        var selectedFreeQuestsIds = Utils.getSelectedQuestionsIds( this.state.freeQuests );
        let data = {
            "requestee": userId,
            "bTags": iVCommonUtils.getArrFromStr( this.state.tags ),
            "bTitle": this.state.title,
            "bDescription" : this.state.description,
            "bStartDateTime": iVCommonUtils.mergeDateTime( this.state.startDate, this.state.startTime ),
            "bEndDateTime": iVCommonUtils.mergeDateTime( this.state.endDate, this.state.endTime ),
            "qIds" : selectedFreeQuestsIds
        };
        requests.createSeminar(data)
            .then( function ( resolve ) {
                console.log('sem created');
                that.setState( {semData: resolve} );
            }, function (reject) {
                console.log('sem rejected');
                that.setState( {semData: reject} );
            });

    };

    showPickQuestionsDialog(){
        this.setState({ showPickQuestDialog: true });
    }

    hidePickQuestionsDialog(){
        this.setState({ showPickQuestDialog: false });
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
                    <ListItem primaryText={item.question}/>
                    <Checkbox
                        label="Add to seminar"
                        checked={ item.selected }
                        onCheck={that.addRemoveQuestion.bind(that, index)}
                        style={{marginBottom: 16}}
                    />
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
        if( Utils.isNonEmptyObject( this.state.semData ) ){
            return (
                <span> Seminar created. please <a href={ Utils.getSeminarForPUrl( this.state.semData.videoId )}> visit here </a> </span>
            )
        }
    }

    render(){
        return(
            <div className="seminar-create-page">
                <div className="main-container">

                    <div className="seminar-create-container">
                        <TextField
                            hintText="Title"
                            errorText={this.state.titleErrorText}
                            type="text"
                            onChange={this.handleTitleChange.bind(this)}
                            value={this.state.title}
                            onBlur={this.onTitleBlur}
                        /><br />
                        <TextField
                            hintText="Description"
                            errorText={this.state.descErrorText}
                            type="text"
                            onChange={this.handleDescriptionChange.bind(this)}
                            value={this.state.description}
                            multiLine={true}
                            onBlur={this.onDescBlur}
                        /><br />
                        <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/><br/>
                        <br />
                        <DatePicker onChange={this.handleStartDate.bind(this)} value ={this.state.startDate} hintText="Seminar start date" />
                        <TimePicker onChange={this.handleStartTime.bind(this)} value={this.state.startTime} hintText="Seminar start time" /><br />
                        <DatePicker onChange={this.handleEndDate.bind(this)} value ={this.state.endDate} hintText="Seminar end date" />
                        <TimePicker onChange={this.handleEndTime.bind(this)} value={this.state.endTime} hintText="Seminar end time" /><br />

                        <FlatButton className="landing-btn" label="Pick questions for seminar" primary={true}
                                    backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.showPickQuestionsDialog}
                                    target="_blank"/>

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
                            <Subheader>{this.getSubheaderText()}</Subheader>
                            {this.showSelectedQuesList()}
                        </List>

                        <FlatButton className="landing-btn" label="Create Seminar" primary={true}
                                    backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleSubmit.bind(this)}
                                    target="_blank"/>
                    </div>
                    <div className="msg-bar">
                        {this.getMsgBarContent()}
                    </div>
                </div>
            </div>
        )
    }

}

export default withCookies( Seminar );