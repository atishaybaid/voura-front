import React,{Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Subheader from 'material-ui/Subheader';
import '../less/Profile.less';
import FollowButton from './FollowButton.jsx';

class Profile extends Component{
    constructor(props){
        super(props);
    }
    renderChips(){
     let dummyTags = ['React.js','Redux','Node.js','Html','Css','Less']
        return  dummyTags.map((selectedTag,index)=>(<Chip style={{'margin':'5px'}}key={index}>{selectedTag}</Chip>)
                        
                    )  
    }
    render(){
        return(
            <div className="profile-page">
              <div className="profile-card">
                <Card style={{'backgroundColor':'aliceblue','padding':'10px'}}>
                <div className="profile-card-header">
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


export default Profile;
