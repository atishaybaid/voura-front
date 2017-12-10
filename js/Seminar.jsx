import React ,{ Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import axios from 'axios';
import iVCommonUtils from './utils/common';
//import {iVConfigs} from '../Configs/local.js';
import iVConfigs from '../Configs/local.json';
import {PostReq} from './utils/apiRequest.jsx';
import { withCookies, Cookies } from 'react-cookie';
import Dialog from 'material-ui/Dialog';
import QuestionList from './QuestionList.jsx';
import Utils from './utils/common.js';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';

class Seminar extends Component {
    constructor(props){
        super();
        this.state ={
            title:'',
            description: '',
            tags: '',
            startDate: new Date(),
            startTime: new Date(),
            endDate: new Date(),
            endTime: new Date(),
            thumbnail:'',
            freeQuests: [],
            showPickQuestDialog: false
        }
        this.showPickQuestionsDialog = this.showPickQuestionsDialog.bind(this);
        this.hidePickQuestionsDialog = this.hidePickQuestionsDialog.bind(this);
        this.showSelectedQuesList = this.showSelectedQuesList.bind(this);
        this.pickQuestions = this.pickQuestions.bind(this);
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

    handleTitleChange(event,newValue){
        this.setState({title:newValue});
    };
    handleDescriptionChange(event,newValue){
        this.setState({description:newValue});
    };
    handleTagsChange(event,newValue){
        this.setState({tags:newValue});
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

    handleSubmit(event,newValue){

        const { cookies } = this.props
        const userId = cookies.get('userId');

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

        var path = iVConfigs.seminar.createSeminarEndpoint;
        PostReq( path, data )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    //that.setState( { questionList: response.data.data } ) ;
                    console.log( response.data.data );
                } else {
                    console.log( response );
                }

            })
            .catch(function (error) {
                console.log(error);
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
                    <hr class="hr-primary"/>
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

    render(){
        return(
            <div className="seminar-create-page">
                <div className="main-container">

                    <div className="seminar-create-container">
                        <TextField
                            hintText="Title"
                            errorText="Please provide title for seminar"
                            floatingLabelText="Title"
                            type="text"
                            onChange={this.handleTitleChange.bind(this)}
                            value={this.state.title}
                        /><br />
                        <TextField
                            hintText="Description"
                            errorText="Please provide description for seminar"
                            floatingLabelText="Description"
                            type="text"
                            onChange={this.handleDescriptionChange.bind(this)}
                            value={this.state.description}
                        /><br />
                        <TextField
                            hintText="Tags"
                            errorText="Please provide tags for seminar"
                            floatingLabelText="tags"
                            type="text"
                            onChange={this.handleTagsChange.bind(this)}
                            value={this.state.tags}
                        /><br />
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
                            modal={true}
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
                </div>
            </div>
        )
    }

}

export default withCookies( Seminar );