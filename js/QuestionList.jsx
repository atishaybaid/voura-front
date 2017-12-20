import React ,{ Component } from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import {GetReq,PostReq} from './utils/apiRequest.jsx';
import iVConfigs from '../Configs/local.json';
import Checkbox from 'material-ui/Checkbox';
import requests from './utils/requests';
import Utils from './utils/common.js';

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedTag: "",
            questionList: [],
            tags: [],
            page: 0,
            limitPerPage: 10,
            inputText: ""
        }
        this.fetchTags = this.fetchTags.bind(this);
        this.handleTagSelected = this.handleTagSelected.bind(this);
        this.addToSeminar = this.addToSeminar.bind(this);
        this.search = this.search.bind(this);
    };

//let him add any tagged questions to seminar
/*
    fetchTags(searchText){


        var that = this;
        //GetReq("users/tags", iVConfigs.common.baseUrl )
        GetReq(`users/suggestions/tag?t=${searchText}`, iVConfigs.common.baseUrl )
            .then((res)=>{
                if( Utils.isNonEmptyObject( res.data.data ) ) {
                    let tagList = JSON.parse(res.data.data);
                    that.setState({tags: tagList});
                }
            })
            .catch((err)=>{
                console.log(err);
            });

    }
*/

    fetchTags(searchText){
        var that = this;
        this.setState({ inputText:searchText });
        requests.fetchTags( searchText ).then( function ( resolve ) {
            let tagList =  resolve;
            that.setState({tags:tagList});
        });
    }

    handleTagSelected(chosenTag){
        this.setState({searchedTag:chosenTag})
        //@todo hit api to fetch questions with this tag and set state of question list
        var that = this;
        //GetReq("users/tags", iVConfigs.common.baseUrl )
        /*GetReq(`questions/questionbytag?tags=${this.state.searchedTag}&page=${this.state.page}&limit=${this.state.limitPerPage}`, iVConfigs.tags.url )
            .then((res)=>{
                if( res.status == 200 && res.data.status == 'SUCCESS' ){
                    console.log( res );
                    that.setState({ questionList: res.data.data });
                }
            })
            .catch((err)=>{
                console.log(err);
            });*/

        var data = { searchedTag: this.state.searchedTag, page: this.state.page, limitPerPage: this.state.limitPerPage };
        requests.searchQuestionsByTag( data ).then( function ( resolve ) {
            that.setState({ questionList: resolve });
        }, function ( reject ) {

        });

    }

    addQuestion( index, event, checked ){
        let qList = this.state.questionList;
        qList[index].selected = checked;
        this.setState({questionList:qList});
    }



    generateQuesList(){
        //console.log( this.state.questionList );
        var that = this;
        var quesList = '';
        if( Utils.isNonEmptyArray( this.state.questionList ) ) {
            var quesList = this.state.questionList.map(function (item, index) {
                return <div key={`selectedQuest.quest_${index}`}>
                    <ListItem primaryText={item.question}/>
                    <Checkbox
                        label="Add to seminar"
                        checked={ item.selected }
                        onCheck={that.addQuestion.bind(that, index)}
                        style={{marginBottom: 16}}
                    />
                    <hr className="hr-primary"/>
                </div>
            })
        }
        //console.log( quesList );
        return quesList;
    }

    addToSeminar(){
        //var qIds = this.getSelectedQuestions( this.state.questionList );
        var quests = Utils.getSelectedQuestions( this.state.questionList );
        if( this.props.pickQuestion ){
            this.props.pickQuestion( quests );
        }
    }

    search(){
        //spoof tag is selected
        var chosenTag = { Name: this.state.inputText };
        this.handleTagSelected( chosenTag );
    }

    render(){
        return (
            <div className="questionList-page">
                <AutoComplete
                    hintText="Search Tags"
                    dataSource={this.state.tags}
                    dataSourceConfig={{text:"Name",value:"Name"}}
                    maxSearchResults={10}
                    onNewRequest={this.handleTagSelected}
                    onUpdateInput={this.fetchTags}
                />
                <FlatButton className="control-btn" label='Search' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.search} target="_blank"/>
                <br/>
                <div className="Question-list">
                    <List>
                        <Subheader>Add questions to seminar</Subheader>
                        {this.generateQuesList()}
                    </List>
                </div><br/>
                <FlatButton className="control-btn" label='Add to seminar' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.addToSeminar} target="_blank"/>
            </div>
        )
    }
}

export  default QuestionList;