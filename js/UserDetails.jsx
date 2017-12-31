import React,{Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import {fetchTags} from './actionCreators.js'
import {connect} from 'react-redux';
import {GetReq,PostReq} from './utils/apiRequest.jsx';
import requests from './utils/requests';
import Utils from './utils/common';
import Snackbar from 'material-ui/Snackbar';
import TagBox from './TagBox';
import PropTypes from 'prop-types';

class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            tags:[],
            selectedTag:[],

            snackBarAutoHideDuration: 4000,
            snackBarMessage: '',
            snackBarOpen: false,

        }
        this.handleContinue = this.handleContinue.bind(this);
        this.handleActionClick = this.handleActionClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.getSelectedTags = this.getSelectedTags.bind(this);
    }

    
    handleContinue(){
        let data = {
            "tags": Utils.getTagRatingArray( this.state.selectedTag )
        }
        var that = this;

        requests.updateTags(data).then( function (resolve ) {

            that.setState( {snackBarMessage : 'Account created. You can edit your profile by clicking account >> profile from top right corner'});
            //that.context.router.history.push('/home');
            window.location.href = '/home';
        }, function (reject) {

        });
    }

    handleRequestClose(){
        this.setState({
            snackBarOpen: false,
            snackBarMessage: ''
        });
    };

    handleActionClick(){
        var url = Utils.getProfileEditUrl();
        this.context.history.push( url );
    }

    getSelectedTags( tags ){
        this.setState({ selectedTag: tags });
    }

    render(){
        return(
             <div className="userdetails-container">
                <h1 className="step-title">Provide some intrests, for best experiance</h1>
                <p className="main-line">Last step and you land to home</p>
                 <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/>
            <FlatButton className="landing-btn" label="CONTINUE" primary={true}  backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} 
                    onClick={this.handleContinue} />
                 <Snackbar
                     open={this.state.snackBarOpen}
                     message={this.state.snackBarMessage}
                     action="Edit Full Profile"
                     autoHideDuration={this.state.snackBarAutoHideDuration}
                     onActionClick={this.handleActionClick}
                     onRequestClose={this.handleRequestClose}
                 />
                
            </div>   
            )
       
    }
}

UserDetails.contextTypes = {
    router: PropTypes.object
}
export default UserDetails;