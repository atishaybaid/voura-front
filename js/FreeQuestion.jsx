import React ,{ Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import iVConfigs from '../Configs/local.json';
import requests from './utils/requests';
import TagBox from './TagBox';

import { withCookies, Cookies } from 'react-cookie';

class FreeQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qTitle: '',
            qDesc: '',
            tags: [],
            selectedTag: []
        }
        this.handleAskQuestion = this.handleAskQuestion.bind(this);
        this.qTitleChange = this.qTitleChange.bind(this);
        this.qDescChange = this.qDescChange.bind(this);
        this.getSelectedTags = this.getSelectedTags.bind(this);
        /*this.renderChips = this.renderChips.bind(this);
        this.fetchTags = this.fetchTags.bind(this);
        this.handleTagSelected = this.handleTagSelected.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);*/
    };


    qTitleChange(event,newValue){
        this.setState({qTitle:newValue});
    };
    qDescChange(event,newValue){
        this.setState({qDesc:newValue});
    };
/*
    handleTagSelected(chosenTag){
        let tagList = this.state.selectedTag;
        tagList.push(chosenTag.Name);
        this.setState({selectedTag:tagList})

    }
    handleRequestDelete(tag,index){
        let selectedTag = this.state.selectedTag;
        selectedTag.splice(index,1);
        this.setState({selectedTag:selectedTag})

    }
*/
    handleAskQuestion(){
        const { cookies } = this.props;

//        const userId = cookies.get('userId');

        let data = {
            question: this.state.qTitle,
            desc: this.state.qDesc,
//            user : userId,
            tags: this.state.selectedTag
        }

        var that = this;
        requests.saveQuestion( data )
            .then( function ( resolve ) {
                console.log('question saved' + resolve);
            }, function ( reject ) {
            });
    }
/*
    renderChips(){
        return  this.state.selectedTag.map((selectedTag,index)=>(<Chip key={`selectedTag.tag_${index}`} onRequestDelete={() => this.handleRequestDelete(selectedTag,index)}>
                {selectedTag}
            </Chip>)

        )
    }

    fetchTags(searchText){
            var that = this;
            requests.fetchTags( searchText ).then( function (resolve) {
                let tagList = resolve;
                that.setState({tags:tagList});
            }, function ( reject ) {

            });
    }*/

    getSelectedTags( tags ){
        this.setState({ selectedTag: tags });
    }

    render() {
        return (
            <div className="Question-page">
                <TextField
                    hintText="Type a question"
                    errorText="Please provide title for seminar"
                    type="text"
                    onChange={this.qTitleChange}
                    value={this.state.qTitle}
                    multiLine={true}
                /><br/>
                <TextField
                    hintText="Type question description"
                    type="text"
                    onChange={this.qDescChange}
                    value={this.state.qDesc}
                    multiLine={true}
                /><br/>
                <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/><br/>
                <FlatButton className="control-btn" label='ask' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleAskQuestion} target="_blank"/>
            </div>
        )
    }
}

export  default withCookies( FreeQuestion );