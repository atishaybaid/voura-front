import React,{Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import VrHeader from './VrHeader.jsx'
import Subheader from 'material-ui/Subheader';


class Profile extends Component{
    constructor(props){
        super(props);
    }
    renderChips(){
     let dummyTags = ['React.js','Redux','Node.js','Html','Css','Less']
        return  dummyTags.map((selectedTag,index)=>(<Chip key="123">{selectedTag}</Chip>)
                        
                    )  
    }
    render(){
        return(
            <div className="profile-page">
            <VrHeader/>
                <Card>
                <div className="profile-card-header">
                    <img src="images/profile.jpg" alt=""  width="150px" height="150px"/>
                    <div className="user-info">
                        <div className="user-name">Atishay Baid</div>
                        <div className="user-tagline">React.js Developer</div>
                        <div className="user-desc">I am a Software Engineer,love to develop applications for web ,because web is open. 
                        I programme in web front end technologies with expertise in JavaScript,HTML,CSS and Frameworks such as React.js,Angular.js .I love to contribute to open source world.</div>
                    </div>
                </div>
                    <Divider/>
                    <div className="user-education">
                      <Subheader>Education</Subheader>
                      <h3>Bachelor of Technology (B.Tech.)</h3>
                      <h3>JIIT</h3>
                    </div>
                    <Divider/>
                    <div className="user-tags">
                      <Subheader>Skills</Subheader>
                      <div className="selected-tags">
                             {this.renderChips()}
                        </div>
                    </div>
                
               
                
        
                </Card>

            </div>
            )
    }
        
        
}


export default Profile;
