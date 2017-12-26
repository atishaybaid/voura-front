import React,{Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import VrModal from './common/VrModal.jsx';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import {toggleEditProfile,getProfileData} from './actionCreators.js';
import {connect}  from 'react-redux';
import '../less/Profile.less';
import FollowButton from './FollowButton.jsx';

class Profile extends Component{
    constructor(props){
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.modalChildActions = {handleNameChange:()=>{
          this.handleNameChange();
        }}
    }
    renderChips(){
     let dummyTags = ['React.js','Redux','Node.js','Html','Css','Less']
        return  dummyTags.map((selectedTag,index)=>(<Chip style={{'margin':'5px'}}key={index}>{selectedTag}</Chip>)
                        
                    )  
    }
    handleEdit(){

    }

    componentDidMount(){
      let userEmail = this.props.userEmail;
        this.props.getProfileData(userEmail);
    }

    //edit profile methods
    handleNameChange(){
      console.log("called");
    }

    render(){
        return(
            <div className="profile-page">
              <div className="profile-card">

                <Card style={{'backgroundColor':'aliceblue','padding':'10px'}}>
                <div className="profile-card-header">
                     <i className="fa fa-pencil edit-icon" onClick={this.props.handleEdit} aria-hidden="true"></i>
                    <img src="images/profile.jpg" className="profile-image" alt=""  width="150px" height="150px" />
                    <div className="user-info">
                        <div className="user-name base-pitch">APlha romeo</div>
                        <div className="user-tagline sub-pitch">React.js Developer</div>
                         {/*<Divider style={{margin:'auto',width:'50%'}}/>*/}
                         <hr className="sep"/>
                        <div className="user-desc">I am a Software Engineer,love to develop applications for web ,because web is open. 
                        I programme in web front end technologies with expertise in JavaScript,HTML,CSS and Frameworks such as React.js,Angular.js .I love to contribute to open source world.</div>
                    </div>
                </div>
                    <Divider/>
                    <div className="user-education">
                      <Subheader style={{fontWeight:'600',fontSize:'1em',color:'rgba(0,0,0,.85)'}}>Education</Subheader>
                      
                      <div className="edu-int base-txt">JIIT</div>
                      <div className="edu-dgr base-txt">Bachelor of Technology (B.Tech.)</div>
                    </div>
                    <Divider/>
                    <div className="user-tags">
                      <Subheader style={{fontWeight:'600',fontSize:'1em',color:'rgba(0,0,0,.85)'}}>Skills</Subheader>
                      <div className="selected-tags">
                             {this.renderChips()}
                        </div>
                    </div>
                    <FollowButton />
                
        
                </Card>
              </div>

            </div>
            )
    }


        
        
}
const mapDispatchToProps = (dispatch)=>({
  handleEdit:function(){
    dispatch(toggleEditProfile)
  },
  getProfileData:function(userEmail){
    dispatch(getProfileData(userEmail));
  }

})
const mapStateToProps = (state)=>{
  console.log(state);
  return {editStatus:state.profile.editStatus,userEmail:state.login.email||state.signup.email}
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);

/*
export default Profile;*/