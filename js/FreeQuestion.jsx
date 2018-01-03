import React ,{ Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import iVConfigs from '../Configs/local.json';
import requests from './utils/requests';
import TagBox from './TagBox';
import SearchVideos from './SearchVideos';

import { withCookies, Cookies } from 'react-cookie';
import Snackbar from 'material-ui/Snackbar';

class FreeQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qTitle: '',
            qDesc: '',
            tags: [],
            selectedTag: [],
            searchedAlready: false,

            snackBarAutoHideDuration: 4000,
            snackBarMessage: '',
            snackBarOpen: false,
        }

        this.handleAskQuestion = this.handleAskQuestion.bind(this);
        this.qTitleChange = this.qTitleChange.bind(this);
        this.qDescChange = this.qDescChange.bind(this);
        this.getSelectedTags = this.getSelectedTags.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.getMessageBarText = this.getMessageBarText.bind(this);
    };


    qTitleChange(event,newValue){
        this.setState({qTitle:newValue});
    };
    qDescChange(event,newValue){
        this.setState({qDesc:newValue});
    };

    getMessageBarText( type ) {
        switch (type) {
            case 'ask_success':
                return (
                    <span> Your question has been successfully posted.</span>
                )
            case 'ask_failed':
                return (
                    <span> Error occured while posting question.</span>
                )
            default:
                return null;
        }
    }

    handleRequestClose(){
        this.setState({
            snackBarOpen: false,
            snackBarMessage: ''
        });
    };

        handleAskQuestion() {
/*
        if (!this.state.searchedAlready) {
            this.child.handleSubmit();
            this.setState({searchedAlready: true});
        } else {
*/
            const {cookies} = this.props;
//        const userId = cookies.get('userId');

            let data = {
                question: this.state.qTitle,
                desc: this.state.qDesc,
//            user : userId,
                tags: this.state.selectedTag
            }

            var that = this;
            requests.saveQuestion(data)
                .then(function (resolve) {
                    that.setState({
                        snackBarOpen: true,
                        snackBarMessage: that.getMessageBarText('ask_success'),
                        qTitle: '',
                        qDesc: '',
                        tags: [],
                        selectedTag: [],
                    });
                    that.tagBoxChild.clearTags();
                }, function (reject) {
                    that.setState({
                        snackBarOpen: true,
                        snackBarMessage: that.getMessageBarText('ask_failed')
                    });
                });

        //}
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
            <div className="question-page container">
                <div className="row col-md-10">
                <TextField
                    hintText="Type a question"
                    errorText="Type a question"
                    type="text"
                    onChange={this.qTitleChange}
                    value={this.state.qTitle}
                    multiLine={true}
                    fullWidth={true}
                />
                </div>
                <div className="row col-md-10">
                <TextField
                    hintText="Type question description"
                    type="text"
                    onChange={this.qDescChange}
                    value={this.state.qDesc}
                    multiLine={true}
                    fullWidth={true}
                />
                    </div>

                <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)} onRef={ref => (this.tagBoxChild = ref)}/>
                <div className="row col-md-1">
                <FlatButton className="control-btn" label='ask' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleAskQuestion} target="_blank"/>
                    </div>
                <Snackbar
                    open={this.state.snackBarOpen}
                    message={this.state.snackBarMessage}
                    autoHideDuration={this.state.snackBarAutoHideDuration}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        )
    }
}

export  default withCookies( FreeQuestion );