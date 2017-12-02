import React,{Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import {profileNameChange,profileTitleChange,
    profileDescChange,ProfileInstChange,profileFieldChange} from '../actionCreators.js';

class VrModal extends Component{
    constructor(props){
        super(props);
        this.title = 'Edit Profile';
    }   
    render(){
        return (
            <div className="VrModal">
                <Dialog
                    title={this.title}
                    actions={null}
                    modal={false}
                    open={true} 
                >
                   <div className="edit-profile">
                       <img src="images/profile.jpg" className="profile-image" alt=""  width="150px" height="150px" />
                       <TextField
                        hintText="Name"
                        floatingLabelText="Name"
                        floatingLabelFixed={true}
                        type="text"
                        onChange={this.props.handleNameChange}
                        value={this.props.name}
                      /><br />
                      <TextField
                        hintText="Title"
                        floatingLabelText="Title"
                        floatingLabelFixed={true}
                        type="text"
                        onChange={this.props.handleTitleChange}
                        value={this.props.title}
                      /><br />
                      <TextField
                        hintText="Description"
                        floatingLabelText="Description"
                        floatingLabelFixed={true}
                        type="text"
                        onChange={this.props.handleDescChange}
                        value={this.props.desc}
                      /><br />
                        <Subheader style={{fontWeight:'600',fontSize:'1em',color:'rgba(0,0,0,.85)'}}>Education</Subheader>
                      <TextField
                        hintText="Institute"
                        floatingLabelText="Institute"
                        floatingLabelFixed={true}
                        type="text"
                        onChange={this.props.handleInstChange}
                        value={this.props.instName}
                      /><br />
                      <TextField
                        hintText="Field"
                        floatingLabelText="Field"
                        floatingLabelFixed={true}
                        type="text"
                        onChange={this.props.handleFieldChange}
                        value={this.props.fieldName}
                      /><br />
                      <Subheader style={{fontWeight:'600',fontSize:'1em',color:'rgba(0,0,0,.85)'}}>Skills</Subheader>
                      {/*<div className="selected-tags">
                             {this.renderChips()}
                        </div>*/}
                    </div>


                </Dialog>
            
            </div>
            )
    }


};
const mapDispatchToProps=(dispatch)=>({
 handleNameChange:function(dispatch){
    dispatch(profileNameChange)
 },
 handleTitleChange:function(dispatch){
    dispatch(profileTitleChange)
 },
 handleDescChange:function(dispatch){
    dispatch(profileDescChange)
 },
 handleInstChange:function(dispatch){
    dispatch(profileInstChange)
 },
 handleFieldChange:function(dispatch){
    dispatch(profileFieldChange)
 }  
});
const mapStateToProps = (state)=>({name:state.profile.name,title:state.profile.title,desc:state.profile.desc,instName:state.profile.instName,fieldName:state.profile.fieldName})
export default connect(mapStateToProps,mapDispatchToProps)(VrModal);