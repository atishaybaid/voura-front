import React ,{ Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {GetReq,PostReq} from './utils/apiRequest.jsx';
import iVConfigs from '../Configs/local.json';

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
        this.renderChips = this.renderChips.bind(this);
        this.fetchTags = this.fetchTags.bind(this);
        this.handleTagSelected = this.handleTagSelected.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
    };


    qTitleChange(event,newValue){
        this.setState({qTitle:newValue});
    };
    qDescChange(event,newValue){
        this.setState({qDesc:newValue});
    };

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

    handleAskQuestion(){
        const { cookies } = this.props;

        const userId = cookies.get('userId');

    let data = {
        videoId: null,
        question: this.state.qTitle,
        desc: this.state.qDesc,
        user : userId,
        tags: this.state.selectedTag
    }

    var that = this;
    var path ='questions/save';

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

    }

    renderChips(){
        return  this.state.selectedTag.map((selectedTag,index)=>(<Chip key={`selectedTag.tag_${index}`} onRequestDelete={() => this.handleRequestDelete(selectedTag,index)}>
                {selectedTag}
            </Chip>)

        )
    }

    fetchTags(searchText){

            var that = this;
            GetReq(`users/suggestions/tag?t=${searchText}`, iVConfigs.tags.url )
                .then((res)=>{
                    let tagList = JSON.parse(res.data.data);
                    that.setState({tags:tagList});
                })
                .catch((err)=>{
                    console.log(err);
                });

    }

    render() {
        return (
            <div className="Question-page">
                <TextField
                    hintText="Type a question"
                    floatingLabelText="Question"
                    floatingLabelFixed={true}
                    type="text"
                    onChange={this.qTitleChange}
                    value={this.state.qTitle}
                /><br/>
                <TextField
                    hintText="Type question description"
                    floatingLabelText="Question description"
                    floatingLabelFixed={true}
                    type="text"
                    onChange={this.qDescChange}
                    value={this.state.qDesc}
                /><br/>
                <AutoComplete
                    hintText="Search Tags"
                    dataSource={this.state.tags}
                    dataSourceConfig={{text:"Name",value:"Name"}}
                    maxSearchResults={10}
                    onNewRequest={this.handleTagSelected}
                    onUpdateInput={this.fetchTags}
                /><br/>
                <div className="selected-tags">
                    {this.renderChips()}
                </div><br/>
                <FlatButton className="control-btn" label='ask' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleAskQuestion} target="_blank"/>
            </div>
        )
    }
}

export  default withCookies( FreeQuestion );