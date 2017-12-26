import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {PostReq} from './utils/apiRequest.jsx';
import {showLoginDialog,
        setEmail,
        setPassword} from './actionCreators.js';
import '../less/common.less'
import  {connect} from 'react-redux';
import requests from './utils/requests';

class LoginPopup extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        var that = this;
        let data = {
            "id":this.props.email,
            "password":this.props.password
        }

        requests.signin( data )
            .then(function (response) {
                    window.location.href = '/signup/newuser';
                    that.props.handleGetNotifications();
            });
    }

    render(){
        return(<div className="login-popup">
                <FlatButton className="login-btn" label="Login" primary={true} 
                    backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}}  onClick={this.props.handleLoginOnClick}
                />

             <Dialog
                title="Login into interlverse"
                modal={false}
                open={this.props.showDialog}
                autoScrollBodyContent={true}
                >
                <div className="login-container">
                    <div className="row">
                        <div className="col-md-10">
                    <TextField
                        hintText="Email"
                        type="email"
                        onChange={this.props.handleEmailChange}
                        value={this.props.email}
                        fullWidth={true}
                    />
                    </div>
                        </div>
                    <div className="row">
                        <div className="col-md-10">
                    <TextField
                    hintText="Password"
                    type="password"
                    onChange={this.props.handlePasswordChange}
                    value={this.props.password}
                    fullWidth={true}
                    />
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-6">
                    <FlatButton label="Submit" onClick={this.handleSubmit}/>
                        </div>
                        </div>
                </div>
               
                </Dialog>
            
            </div>
            )
        
    }
}

const mapStateToProps = (state) =>({showDialog:state.login.showDialog,email:state.login.email,password:state.login.password});
const mapDispatchToProps = (dispatch)=>({
    handleLoginOnClick:function(){
        dispatch(showLoginDialog());
    },
    handleEmailChange:function(event,newValue){
        dispatch(setEmail(newValue))
    },
    handlePasswordChange:function(event,newValue){
        dispatch(setPassword(newValue))
    },
    handleGetNotifications:function () {
        dispatch(fetchNotifications())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginPopup)


