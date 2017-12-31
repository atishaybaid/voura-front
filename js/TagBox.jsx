import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import iVConfigs from '../Configs/local.json';
import FlatButton from 'material-ui/FlatButton';
import requests from './utils/requests';
import Utils from './utils/common.js';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

// tags for initial props
// pass selectedTag in props.getSelectedTags to parent
class TagBox extends Component {
    constructor(props) {
        super( props );
        this.state = {
            inputText: '',
            tags : [],
            selectedTag: props.tags ? props.tags : [] // it is tags
        }
        this.fetchTags = this.fetchTags.bind(this);
        this.handleTagSelected = this.handleTagSelected.bind(this);
        this.renderChips = this.renderChips.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.addToChip =this.addToChip.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if( Utils.isNonEmptyArray( nextProps.tags ) ) {
            this.setState({
                selectedTag: nextProps.tags,
            });
        }
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
        if( !isEmpty( chosenTag ) ){
            this.handleTagSelected( chosenTag );
        }
    }

    renderChips(){
        return  this.state.selectedTag.map((selectedTag,index)=>(<Chip style={styles.chip} key={`selectedTag.tag_${index}`} onRequestDelete={() => this.handleRequestDelete(selectedTag,index)}>
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
                <div className="row">
                    <div className="col-md-10">
                <AutoComplete
                    hintText="Search Tags"
                    dataSource={this.state.tags}
                    dataSourceConfig={{text:"Name",value:"Name"}}
                    maxSearchResults={10}
                    onNewRequest={this.handleTagSelected}
                    onUpdateInput={this.fetchTags}
                    searchText={this.state.inputText}
                    fullWidth={true}
                />
                        </div>
                    <div className="col-md-2">
                <FlatButton className="control-btn" label='Add tag' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.addToChip} target="_blank"/>
                        </div>
                </div>
                <div className="selected-tags row" style={styles.wrapper}>
                    {this.renderChips()}
                </div><br/>
            </div>
        );
    }

}

export default TagBox;