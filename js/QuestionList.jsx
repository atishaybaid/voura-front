import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {GetReq,PostReq} from './utils/apiRequest.jsx';
import iVConfigs from '../Configs/local.json';

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedTag: "",
            questionList: [],
            tags: []
        }
        this.handleAskQuestion = this.handleAskQuestion.bind(this);
        this.fetchTags = this.fetchTags.bind(this);
        this.handleTagSelected = this.handleTagSelected.bind(this);
    };

//let him add any tagged questions to seminar
    fetchTags(searchText){

        var that = this;
        //GetReq("users/tags", iVConfigs.common.baseUrl )
        GetReq(`users/suggestions/tag?t=${searchText}`, iVConfigs.tags.url )
            .then((res)=>{
                let tagList = JSON.parse(res.data.data);
                that.setState({tags:tagList});
            })
            .catch((err)=>{
                console.log(err);
            });

    }

    handleTagSelected(chosenTag){
        this.setState({searchedTag:chosenTag})
        //@todo hit api to fetch questions with this tag and set state of question list

    }

    generateQuesList(){
        //console.log( this.state.questionList );
        var that = this;
        var quesList = this.state.questionList.map( function( item ){
            return <div key ={item._id}>
                <ListItem primaryText={item.question} />
                <FlatButton className="control-btn" label='Add to seminar' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={that.addQuestion.bind( this, item._id ) } target="_blank"/>
            </div>
        } )
        //console.log( quesList );
        return quesList;
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
                </div>
            </div>
        )
    }
}

export  default QuestionList;