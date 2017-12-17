import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import iVConfigs from '../Configs/local.json';
import FlatButton from 'material-ui/FlatButton';
import requests from './utils/requests';

// pass selectedTag in props.getSelectedTags
class TagBox extends Component {
    constructor(props) {
        super();
        this.state = {
            inputText: '',
            tags : [],
            selectedTag: [] // it is tags
        }
        this.fetchTags = this.fetchTags.bind(this);
        this.handleTagSelected = this.handleTagSelected.bind(this);
        this.renderChips = this.renderChips.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.addToChip =this.addToChip.bind(this);
    }

    handleTagSelected(chosenTag){
        let tagList = this.state.selectedTag;
        tagList.push(chosenTag);
        this.setState({selectedTag:tagList, inputText: ""})
        if( this.props.getSelectedTags ){
            this.props.getSelectedTags( this.state.selectedTag );
        }
    }

    addToChip(){
        //spoof tag is selected
        var chosenTag = this.state.inputText;
        this.handleTagSelected( chosenTag );
    }

    renderChips(){
        return  this.state.selectedTag.map((selectedTag,index)=>(<Chip key={`selectedTag.tag_${index}`} onRequestDelete={() => this.handleRequestDelete(selectedTag,index)}>
                {selectedTag}
            </Chip>)

        )
    }

    fetchTags(searchText){
        var that = this;
        this.setState({ inputText:searchText });
        requests.fetchTags( searchText ).then( function ( resolve ) {
            let tagList =  resolve;
            that.setState({tags:tagList});
        });
    }

    handleRequestDelete(tag,index){
        let selectedTag = this.state.selectedTag;
        selectedTag.splice(index,1);
        this.setState({selectedTag:selectedTag})
        if( this.props.getSelectedTags ){
            this.props.getSelectedTags( this.state.selectedTag );
        }
    }

    render(){
        return (
            <div className="tagbox">
                <AutoComplete
                    hintText="Search Tags"
                    dataSource={this.state.tags}
                    dataSourceConfig={{text:"Name",value:"Name"}}
                    maxSearchResults={10}
                    onNewRequest={this.handleTagSelected}
                    onUpdateInput={this.fetchTags}
                    searchText={this.state.inputText}
                />
                <FlatButton className="control-btn" label='Add tag' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.addToChip} target="_blank"/>
                <br/>
                <div className="selected-tags">
                    {this.renderChips()}
                </div><br/>
            </div>
        );
    }

}

export default TagBox;