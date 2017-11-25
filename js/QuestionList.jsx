import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
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

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedTag: "",
            questionList: [],
            tags: [],
            page: 0,
            limitPerPage: 10
        }
        this.fetchTags = this.fetchTags.bind(this);
        this.handleTagSelected = this.handleTagSelected.bind(this);
        this.addToSeminar = this.addToSeminar.bind(this);
    };

//let him add any tagged questions to seminar
    fetchTags(searchText){

        var that = this;
        //GetReq("users/tags", iVConfigs.common.baseUrl )
        GetReq(`users/suggestions/tag?t=${searchText}`, iVConfigs.common.baseUrl )
            .then((res)=>{
                let tagList = JSON.parse(res.data.data);
                that.setState({tags:tagList});
            })
            .catch((err)=>{
                console.log(err);
            });

    }

    handleTagSelected(chosenTag){
        this.setState({searchedTag:chosenTag.Name})
        //@todo hit api to fetch questions with this tag and set state of question list
        var that = this;
        //GetReq("users/tags", iVConfigs.common.baseUrl )
        GetReq(`questions/questionbytag?tags=${this.state.searchedTag}&page=${this.state.page}&limit=${this.state.limitPerPage}`, iVConfigs.tags.url )
            .then((res)=>{
                if( res.status == 200 && res.data.status == 'SUCCESS' ){
                    console.log( res );
                    that.setState({ questionList: res.data.data });
                }
            })
            .catch((err)=>{
                console.log(err);
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
        var quesList = this.state.questionList.map( function( item, index ){
            return <div key ={`selectedQuest.quest_${index}`}>
                <ListItem primaryText={item.question} />
                <Checkbox
                    label="Add to seminar"
                    checked={ item.selected }
                    onCheck={that.addQuestion.bind(that, index)}
                    style={{marginBottom: 16}}
                />
            </div>
        } )
        //console.log( quesList );
        return quesList;
    }

    getSelectedQuestions( qList ){
        var res = [ ];
        qList.map( function( item, index ){
            if( item.selected == true ){
                res.push( item._id );
            }
        });
        return res;
    }

    addToSeminar(){
        var qIds = this.getSelectedQuestions( this.state.questionList );
        if( this.props.pickQuestion ){
            this.props.pickQuestion( qIds );
        }
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
                /><br/>
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