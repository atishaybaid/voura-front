import React,{Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import {PostReq,GetReq} from './utils/apiRequest.jsx';

class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            tags:[],
            selectedTag:[]
            
        }

        console.log("user details");
        this.renderChips = this.renderChips.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
    }
    handleUpdateInput(){
        console.log("handleUpdateInput");
    }
    handleTagSelected(chosenTag){
        console.log(chosenTag);
        let tagObj = {
            tag:chosenTag.Name,
            rating:1
        }
        let tagList = this.state.selectedTag;
        tagList.push(tagObj);
        this.setState({selectedTag:tagList})
       
    }
    handleUpdateUserInput(searchText){
        let that = this;
        if(searchText.length >= 3){
            GetReq(`users/suggestions/tag?t=${searchText}`,' http://api.intelverse.com:3000')
            .then((res)=>{
                let tags = JSON.parse(res.data.data);
                that.setState({tags:tags})

            })
            .catch((err)=>{
                console.log(err);
            })
        }        

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

    componentDidMount(){
        console.log("componentDidMount called");
      

        
    }
    render(){
        return(
             <div className="userdetails-container">
                <h1 className="step-title">Provide some intrests,or best experiance</h1>
                <p className="main-line">Last step and you land to home</p>
                    <AutoComplete
                        hintText="Search Tags"
                        dataSource={this.state.tags}
                        dataSourceConfig={{text:"Name",value:"Name"}}
                        maxSearchResults={10}
                        onNewRequest={this.handleTagSelected.bind(this)}
                        onUpdateInput={this.handleUpdateUserInput.bind(this)}
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

export default UserDetails;