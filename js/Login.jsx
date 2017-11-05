import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {PostReq} from './utils/apiRequest.jsx';
import '../less/common.less'

class LoginPopup extends Component {
    constructor(props){
        super(props);
        this.state={
            showDialog:false,
            email:'',
            password:''
        }
        this.handleLoginOnClick = this.handleLoginOnClick.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    handleLoginOnClick(){
         this.setState({showDialog:true})
        
    }
    handleEmailChange(event,newValue){
        this.setState({email:newValue});
    };
    handlePasswordChange(event,newValue){
        this.setState({password:newValue});
    };
    handleSubmit(){
        let data = {
            "id":this.state.email,
            "password":this.state.password
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
                    backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}}  onClick={this.handleLoginOnClick}
                />

             <Dialog
                title=""
                actions={null}
                modal={true}
                open={this.state.showDialog}
               
                >
                <div className="login-container">
                    <h1 className="heading">Login</h1>
                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        floatingLabelFixed={true}
                        type="email"
                        onChange={this.handleEmailChange}
                        value={this.state.email}
                    /><br />
        
                    <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    floatingLabelFixed={true}
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.pass}

                    /><br />
                    <FlatButton label="Submit" onClick={this.handleSubmit}/>

                </div>
               
                </Dialog>
            
            </div>
            )
        
    }
}

export default LoginPopup;