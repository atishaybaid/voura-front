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

class EditProfile extends Component {

    constructor(props) {
        super(props);
        var userId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        this.state = {
            userId: userId,
            name: "",
            description: "",
            tagline: "",
            tags: [],

            educations: [],
            showAddEducationDialog: false,
            eduItemToEdit: {},

            experiences: [],
            showAddExperienceDialog: false,
            expItemToEdit: {}
        }
        // inc only below vars, don't decrement in case of deletion of item
        this.eduInx = 1; // used while adding/updating/listing of educations, be careful
        this.expInx = 1; // used while adding/updating/listing of experiences, be careful
        //@todo
        // when we get data through props/get from ajax, attach eduInx to each item,

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
        this.updateProfileInfo = this.updateProfileInfo.bind(this)
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
        this.setState({showAddEducationDialog: false});
    }
    showAddEducationDialog(){
        this.setState({showAddEducationDialog: true});
    }
    
    _updateEducationItem( edus, eduItem ){
        var res = [];
        edus.forEach( function ( item ) {
            if( Utils.isNonEmptyObject( item ) && (item.index == eduItem.index) ){
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

        this.setState({ educations: edus, showAddEducationDialog: false });
    }

    pickEduItemForEdit( item ){
        this.setState({eduItemToEdit:item, showAddEducationDialog: true});
    }


    handleAddExperience(){
        this.showAddExperienceDialog();
    }
    hideAddExperienceDialog(){
        this.setState({showAddExperienceDialog: false});
    }
    showAddExperienceDialog(){
        this.setState({showAddExperienceDialog: true});
    }

    _updateExperienceItem( exps, expItem ){
        var res = [];
        exps.forEach( function ( item ) {
            if( Utils.isNonEmptyObject( item ) && (item.index == expItem.index) ){
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

        this.setState({ experiences: exps, showAddExperienceDialog: false });
    }

    pickExpItemForEdit( item ){
        this.setState({expItemToEdit:item, showAddExperienceDialog: true});
    }

    render(){
        return(
            <div className="edit-profile-page">
                <div className="main-container container">
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
                    <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/><br/>
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
                </div>
            </div>
        )
    }

}

export default EditProfile;