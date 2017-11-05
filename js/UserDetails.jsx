import React,{Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
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
    }
    handleUpdateInput(){
        console.log("handleUpdateInput");
    }
    handleTagSelected(chosenTag){
        console.log("handleTagSelected")
        console.log(chosenTag);
      this.state.selectedTag.push(chosenTag);
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
    handleRequestDelete(selectedTag){
        console.log("handleRequestDelete called");
        console.log(selectedTag);
    }
    renderChips(){
      return  this.state.selectedTag.map((selectedTag)=>(<Chip key={selectedTag.Name} onRequestDelete={() => this.handleRequestDelete(selectedTag.Name)}>
                                        {selectedTag.Name}
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
                
                
            </div>   
            )
       
    }
}

export default UserDetails;