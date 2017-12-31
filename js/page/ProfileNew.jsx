import React, {Component} from 'react';
import requests from '../utils/requests';
import EducationList from '../components/EducationList';
import ExperienceList from '../components/ExperienceList';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import '../../less/Profile.less';
import FollowButton from '../FollowButton.jsx';
import Subheader from 'material-ui/Subheader';
import Utils from '../utils/common.js';

class ProfileNew extends Component {

    constructor(props) {
        super(props);
        this.userId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        this.state = {
            profileData: {}
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.renderChips = this.renderChips.bind(this);
        this.getEditButton = this.getEditButton.bind(this);
    }

    renderChips(){
        var tags = this.state.profileData.tags;
        if( Utils.isNonEmptyArray( tags ) ) {
            return tags.map((selectedTag, index)=>(<Chip style={{'margin':'5px'}} key={index}>{selectedTag}</Chip>)
            )
        } else {
            return null;
        }
    }

    componentDidMount() {
        //this.setState( { profileData: } );
        //var resolve = this.getDummyProfileData();

        var that = this;
        Promise.all( [ requests.getUserInfo(), requests.getTagsForUser() ] )
            .then(  function ( allData ) {
                var data = allData[0];
                data.tags = Utils.getTagsFromTagRatingArray( allData[1] );
                that.setState({profileData: data});
            } );

    }

    getEditButton(){
        var that = this;
        if( Utils.getCookie('userId') == this.userId ){
            return ( <i className="fa fa-pencil edit-icon" onClick={that.handleEdit} aria-hidden="true"></i> )
        } else {
            return null;
        }
    }

    handleEdit(){
        var profileEditUrl = Utils.getProfileEditUrl( this.userId )
        this.context.router.history.push( profileEditUrl );
    }

    render() {
        return (
            <div className="profile-page">
            <div className="profile-card">

                <Card style={{'backgroundColor':'aliceblue','padding':'10px'}}>
                    <div className="profile-card-header">
                        {this.getEditButton()}
                        <img src={this.state.profileData.image} className="profile-image" alt="" width="150px" height="150px"/>
                        <div className="user-info">
                            <div className="user-name base-pitch">{this.state.profileData.name}</div>
                            <div className="user-tagline sub-pitch">{this.state.profileData.title}</div>
                            {/*<Divider style={{margin:'auto',width:'50%'}}/>*/}
                            <hr className="sep"/>
                            <div className="user-desc">{this.state.profileData.desc}</div>
                            <Divider/>
                            <FollowButton />
                        </div>
                    </div>
                    <Divider/>
                    <div className="education-box">
                        <div className="row">
                            <div className="col-md-8">
                                <span className="h3">Education</span>
                            </div>
                        </div>
                        <EducationList eduList={this.state.profileData.colleges} readonly/>
                    </div>
                    <Divider/>
                    <div className="experience-box">
                        <div className="row">
                            <div className="col-md-8">
                                <span className="h3">Experience</span>
                            </div>
                        </div>
                        <ExperienceList expList={this.state.profileData.organisations} readonly/>
                    </div>
                    <div className="user-tags">
                        <Subheader style={{fontWeight:'600',fontSize:'1em',color:'rgba(0,0,0,.85)'}}>Skills</Subheader>
                        <div className="selected-tags">
                            {this.renderChips()}
                        </div>
                    </div>
                    </Card>
                </div>
                </div>
                    )
        }


}

ProfileNew.contextTypes = {
    router: PropTypes.object
}
export default ProfileNew;