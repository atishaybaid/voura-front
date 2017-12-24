import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TagBox from '../TagBox';
import requests from '../utils/requests';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddEducation from '../components/AddEducation';
import EducationList from '../components/EducationList';
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
            experiences: [],
            showAddEducationDialog: false,
            eduItemToEdit: {}
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
                </div>
            </div>
        )
    }

}

export default EditProfile;