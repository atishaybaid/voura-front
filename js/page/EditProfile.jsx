import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TagBox from '../TagBox';
import requests from '../utils/requests';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddEducation from '../components/AddEducation';
import EducationList from '../components/EducationList';
import AddExperience from '../components/AddExperience';
import ExperienceList from '../components/ExperienceList';
import Utils from '../utils/common.js';
import PropTypes from 'prop-types';
import FileBase64 from '../components/react-file-base64';
import DDP from '../utils/DummyDataProvider';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        //this.userId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        //this.userId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        this.userId = Utils.isEmpty( props.match.params.id ) ? '' : props.match.params.id;
        this.state = {
            name: "",
            description: "",
            tagline: "",
            tags: [],

            educations: [],
            showAddEducationDialog: false,
            eduItemToEdit: {},

            experiences: [],
            showAddExperienceDialog: false,
            expItemToEdit: {},
            profileUpdated : "",
            file: {}
        }
        // inc only below vars, don't decrement in case of deletion of item
        this.eduInx = 1; // used while adding/updating/listing of educations, be careful
        this.expInx = 1; // used while adding/updating/listing of experiences, be careful
        //@todo
        // when we get data through props/get from ajax, attach eduInx to each item,

        this.EDIT_PROFILE_RESULT = {
            "error" : <span>Some error occured while updating profile. please try again after some time.</span>,
            "success" : <span>profile updated. you can view your profile by clicking <a href={ Utils.getProfileUrl( this.userId ) }>this</a></span>
        };
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTaglineChange = this.handleTaglineChange.bind(this);
        this.handleAddEducation = this.handleAddEducation.bind(this);
        this.hideAddEducationDialog = this.hideAddEducationDialog.bind(this);
        this.updateEducationItem = this.updateEducationItem.bind(this);
        this.showAddEducationDialog = this.showAddEducationDialog.bind(this);
        this.pickEduItemForEdit = this.pickEduItemForEdit.bind(this);

        this.handleAddExperience = this.handleAddExperience.bind(this);
        this.hideAddExperienceDialog = this.hideAddExperienceDialog.bind(this);
        this.showAddExperienceDialog = this.showAddExperienceDialog.bind(this);
        this._updateExperienceItem = this._updateExperienceItem.bind(this);
        this.updateExperienceItem = this.updateExperienceItem.bind(this);
        this.pickExpItemForEdit = this.pickExpItemForEdit.bind(this);
        this.updateProfileInfo = this.updateProfileInfo.bind(this);
        this.getDataForProfile = this.getDataForProfile.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.insertCollegeIndexes = this.insertCollegeIndexes.bind(this);
        this.insertExpIndexes = this.insertExpIndexes.bind(this);
        this.removeCollegeIndexes = this.removeCollegeIndexes.bind(this);
        this.removeExpIndexes = this.removeExpIndexes.bind(this);
        this.getFile = this.getFile.bind(this);
        this._updateEducationItem = this._updateEducationItem.bind(this);
        this.getSelectedTags = this.getSelectedTags.bind(this);
        this.getProfileImage = this.getProfileImage.bind(this);
    }

    getDataForProfile(){
        //@todo get required data form state only
        var data = {}, state = this.state;
        data.name = state.name;
        data.desc = state.description;
        data.title = state.tagline;
        data.tags = state.tags;
        data.colleges = state.educations;
        data.organisations = state.experiences;
        data.image = state.file.base64;
        return data;
    }

    getFile(file){
        this.setState({ file: file })
    }


    removeCollegeIndexes( data ){
        var colleges = data.colleges;
        var that = this;
        colleges.forEach( function ( college ) {
            delete college.index;
        } );

        data.colleges = colleges;
        return data;
    }

    removeExpIndexes( data ){
        var orgs = data.organisations;
        var that = this;
        orgs.forEach( function ( org ) {
            delete org.index;
        } );

        data.organisations = orgs;
        return data;
    }

    insertCollegeIndexes( data ){
        var colleges = data.colleges;
        var that = this;
        colleges.forEach( function ( college ) {
            college.index = ++that.eduInx;
        } );

        data.colleges = colleges;
        return data;
    }

    insertExpIndexes( data ){
        var orgs = data.organisations;
        var that = this;
        orgs.forEach( function ( org ) {
            org.index = ++that.expInx;
        } );

        data.organisations = orgs;
        return data;
    }

    componentDidMount() {
        //this.setState( { profileData: } );
        /*
        var resolve = DDP.getDummyProfileData();
        resolve = this.insertCollegeIndexes( resolve );
        resolve = this.insertExpIndexes(resolve);
        this.setState( { name: resolve.name, description: resolve.desc, tagline: resolve.title, tags: resolve.tags, educations: resolve.colleges,showAddEducationDialog: false, eduItemToEdit: {}, experiences: resolve.organisations, showAddExperienceDialog: false, expItemToEdit: {} } );
        return;
        */

        var that = this;
        Promise.all( [ requests.getUserInfo(), requests.getTagsForUser() ] )
            .then(  function ( allData ) {

                var resolve = that.insertCollegeIndexes( allData[0] );
                resolve = that.insertExpIndexes(resolve);
                //resolve = that.preProcessInput( resolve );
                that.setState( {
                    name: resolve.name ? resolve.name : '',
                    description: resolve.desc ? resolve.desc : '',
                    tagline: resolve.title ? resolve.title : '',
                    tags: Utils.getTagsFromTagRatingArray( allData[1] ) ,
                    educations: Utils.isNonEmptyArray( resolve.colleges ) ? resolve.colleges : [],
                    showAddEducationDialog: false,
                    eduItemToEdit: {},
                    experiences: Utils.isNonEmptyArray( resolve.organisations ) ? resolve.organisations : [],
                    showAddExperienceDialog: false,
                    expItemToEdit: {},
                    file: Utils.getFileObjectFromBase64( resolve.image )
                } );

            } );
    }

    updateProfileInfo(){
        var data = this.getDataForProfile();
        data = this.removeCollegeIndexes( data );
        data = this.removeExpIndexes(data);
        //console.log( data ); return;
        var that = this;
        requests.putUserInfo( data ).then( function ( res ) {
            that.setState( { profileUpdated : "success" });
        }, function ( error ) {
            that.setState( { profileUpdated : "error" });
        })
    }

    handleNameChange(event,newValue){
        this.setState({name:newValue});
    }

    handleDescriptionChange(event,newValue){
        this.setState({description:newValue});
    }

    handleTaglineChange(event,newValue){
        this.setState({tagline:newValue});
    }

    getSelectedTags( tags ){
        this.setState({ tags: tags });
    }


    handleAddEducation(){
        this.showAddEducationDialog();
    }
    hideAddEducationDialog(){
        this.setState({showAddEducationDialog: false, eduItemToEdit: {} });
    }
    showAddEducationDialog(){
        this.setState({showAddEducationDialog: true});
    }
    
    _updateEducationItem( edus, eduItem ){
        var res = [];

        edus.forEach( function ( item ) {
            if( Utils.isNonEmptyObject( item ) && (item.index == eduItem.index) ){
                if( eduItem.deleted != true )
                    res.push( eduItem );
            } else {
                res.push( item );
            }
        })
        return res;
    }
    
    updateEducationItem( eduItem ){
        var edus = this.state.educations;
        if( Utils.isEmpty( eduItem.index ) ){
            eduItem.index = ++this.eduInx;
            edus.push( eduItem );
        } else {
            edus = this._updateEducationItem( edus, eduItem );
        }

        this.setState({ educations: edus, showAddEducationDialog: false, eduItemToEdit: {} });
    }

    pickEduItemForEdit( item ){
        this.setState({eduItemToEdit:item, showAddEducationDialog: true});
    }


    handleAddExperience(){
        this.showAddExperienceDialog();
    }
    hideAddExperienceDialog(){
        this.setState({showAddExperienceDialog: false, expItemToEdit: {} });
    }
    showAddExperienceDialog(){
        this.setState({showAddExperienceDialog: true});
    }

    _updateExperienceItem( exps, expItem ){
        var res = [];
        exps.forEach( function ( item ) {
            if( Utils.isNonEmptyObject( item ) && (item.index == expItem.index) ){
                if( expItem.deleted != true )
                    res.push( expItem );
            } else {
                res.push( item );
            }
        })
        return res;
    }

    updateExperienceItem( expItem ){
        var exps = this.state.experiences;
        if( Utils.isEmpty( expItem.index ) ){
            expItem.index = ++this.expInx;
            exps.push( expItem );
        } else {
            exps = this._updateExperienceItem( exps, expItem );
        }

        this.setState({ experiences: exps, showAddExperienceDialog: false, expItemToEdit:{} });
    }

    pickExpItemForEdit( item ){
        this.setState({expItemToEdit:item, showAddExperienceDialog: true});
    }

    getInfo(){

            if( this.profileUpdated == 'success' )
                return this.EDIT_PROFILE_RESULT.success;
            else if( this.profileUpdated == 'error' )
                return this.EDIT_PROFILE_RESULT.error;
            else
                return null;

    }

    getProfileImage(){
        if( Utils.isNonEmptyObject( this.state.file ) ){
            return (
            <div className="row">
                <div className="text-center">
                    <img src={this.state.file.base64}/>
                </div>
            </div>
            )
        } else {
            return null;
        }
    }
    render(){
        return(
            <div className="edit-profile-page">
                <div className="main-container container">
                    {this.getProfileImage()}
                    <div className="row">
                        <FileBase64
                            multiple={ false }
                            onDone={ this.getFile.bind(this) } />
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <TextField
                                hintText="Name"
                                type="text"
                                onChange={this.handleNameChange}
                                value={this.state.name}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <TextField
                                hintText="Description"
                                type="text"
                                onChange={this.handleDescriptionChange}
                                value={this.state.description}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <TextField
                                hintText="Tagline"
                                type="text"
                                onChange={this.handleTaglineChange}
                                value={this.state.tagline}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                    <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)} tags={this.state.tags} /><br/>
                    <div className="education-box">
                        <div className="row">
                            <div className="col-md-8">
                                <span className="h3">Add education</span>
                            </div>
                            <div className="col-md-4">
                                <FlatButton
                                    secondary={true}
                                    icon={<ContentAdd />}
                                    onClick={this.handleAddEducation}
                                />
                            </div>
                        </div>
                        <Dialog
                            title="Add Education"
                            actions={null}
                            open={this.state.showAddEducationDialog}
                            onRequestClose={this.hideAddEducationDialog}
                            autoScrollBodyContent={true}
                        >
                        <AddEducation updateEducationItem={(q)=>this.updateEducationItem(q)} eduItem={this.state.eduItemToEdit} />
                        </Dialog>
                        <EducationList eduList={this.state.educations} pickEduItemForEdit={(q)=>this.pickEduItemForEdit(q)}/>


                    </div>
                    <div className="experience-box">
                        <div className="row">
                            <div className="col-md-8">
                                <span className="h3">Add experience</span>
                            </div>
                            <div className="col-md-4">
                                <FlatButton
                                    secondary={true}
                                    icon={<ContentAdd />}
                                    onClick={this.handleAddExperience}
                                />
                            </div>
                        </div>
                        <Dialog
                            title="Add Experience"
                            actions={null}
                            open={this.state.showAddExperienceDialog}
                            onRequestClose={this.hideAddExperienceDialog}
                            autoScrollBodyContent={true}
                        >
                            <AddExperience updateExperienceItem={(q)=>this.updateExperienceItem(q)} expItem={this.state.expItemToEdit} />
                        </Dialog>
                        <ExperienceList expList={this.state.experiences} pickExpItemForEdit={(q)=>this.pickExpItemForEdit(q)}/>

                    </div>
                    <div className="submit-box">
                        <div className="row">
                            <div className="col-md-8">
                                <FlatButton
                                    label="Update Profile Info"
                                    primary={true}
                                    keyboardFocused={true}
                                    onClick={this.updateProfileInfo}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="row">
                            {this.getInfo()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default EditProfile;