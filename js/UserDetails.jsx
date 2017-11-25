import React,{Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import {fetchTags} from './actionCreators.js'
import {connect} from 'react-redux';
import {GetReq,PostReq} from './utils/apiRequest.jsx';

class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            tags:[],
            selectedTag:[]
            
        }
        this.renderChips = this.renderChips.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
    }
    handleUpdateInput(){
        console.log("handleUpdateInput");
    }
    handleTagSelected(chosenTag){
        let tagObj = {
            tag:chosenTag.Name,
            rating:1
        }
        let tagList = this.state.selectedTag;
        tagList.push(tagObj);
        this.setState({selectedTag:tagList})
       
    }
    handleRequestDelete(tag,index){
        let selectedTag = this.state.selectedTag;
        selectedTag.splice(index,1);
       this.setState({selectedTag:selectedTag})
        
    }
    handleContinue(){
        let data = {
            "id":"atishaybaid@gmail.com",
            "tags":this.state.selectedTag
        }


        PostReq('/users/tags',data)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(error);
        })
    }
    renderChips(){
      return  this.state.selectedTag.map((selectedTag,index)=>(<Chip key={`selectedTag.tag_${index}`} onRequestDelete={() => this.handleRequestDelete(selectedTag.tag,index)}>
                                        {selectedTag.tag}
                                        </Chip>)
                        
                    )  
    }
    render(){
        return(
             <div className="userdetails-container">
                <h1 className="step-title">Provide some intrests,for best experiance</h1>
                <p className="main-line">Last step and you land to home</p>
                    <AutoComplete
                        hintText="Search Tags"
                        dataSource={this.props.tags}
                        dataSourceConfig={{text:"Name",value:"Name"}}
                        maxSearchResults={10}
                        onNewRequest={this.handleTagSelected.bind(this)}
                        onUpdateInput={this.props.handleUpdateUserInput}
                    />
                <div className="selected-tags">
                  {this.renderChips()}
                </div>
            <FlatButton className="landing-btn" label="CONTINUE" primary={true}  backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} 
                    onClick={this.handleContinue} />
                
            </div>   
            )
       
    }
}
const mapStateToProps = (state) =>({tags:state.tagList})

const mapDispatchToProps = (dispatch)=>({
    handleUpdateUserInput:function(searchText){
        dispatch(fetchTags(searchText));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(UserDetails);