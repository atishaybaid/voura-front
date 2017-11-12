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
class LoginPopup extends Component {
    constructor(props){
        console.log(props);
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        let data = {
            "id":this.props.email,
            "password":this.props.password
        }

        PostReq('users/signin',data)
        .then(function (response) {
                console.log(response.status);
               if(response.status == 200){
                window.location.href = '/signup/newuser';

               }
           
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render(){
        return(<div className="login-popup">
                <FlatButton className="login-btn" label="Login" primary={true} 
                    backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}}  onClick={this.props.handleLoginOnClick}
                />

             <Dialog
                title=""
                actions={null}
                modal={true}
                open={this.props.showDialog}
               
                >
                <div className="login-container">
                    <h1 className="heading">Login</h1>
                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        floatingLabelFixed={true}
                        type="email"
                        onChange={this.props.handleEmailChange}
                        value={this.props.email}
                    /><br />
        
                    <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    floatingLabelFixed={true}
                    type="password"
                    onChange={this.props.handlePasswordChange}
                    value={this.props.password}

                    /><br />
                    <FlatButton label="Submit" onClick={this.handleSubmit}/>

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
    }

})

export default connect(mapStateToProps,mapDispatchToProps)(LoginPopup)


