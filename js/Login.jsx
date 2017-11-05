import React,{Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import '../less/common.less'

class LoginPopup extends Component {
    constructor(props){
        super(props);
        this.state={
            showDialog:false,
            email:'',
            password:''
        }
        this.handleLoginOnClick = this.handleLoginOnClick.bind(this)
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

        console.log("handleSubmit called");
        let data = {
            "id":this.state.email,
            "password":this.state.password
        }
        console.log(data);
        let axiosInstance = axios.create({
            baseURL: 'http://lapis.intelverse.com:3000/',
            timeout: 5000,
            headers: {'Access-Control-Allow-Origin': '*'}
            });

        axiosInstance.post('users/signin',data)
            .then(function (response) {
                console.log(response);
           
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render(){
        return(<div className="login-popup">
                {/*<FlatButton label="Login" onClick={this.handleLoginOnClick}/>*/}
                <FlatButton className="login-btn" label="Login" primary={true} 
                    backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}}  onClick={this.handleLoginOnClick}
                />

             {<Dialog
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
                        onChange={this.handleEmailChange.bind(this)}
                        value={this.state.email}
                    /><br />
        
                    <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    floatingLabelFixed={true}
                    type="password"
                    onChange={this.handlePasswordChange.bind(this)}
                    value={this.state.pass}

                    /><br />
                    <FlatButton label="Submit" onClick={this.handleSubmit.bind(this)}/>

                </div>
               
                </Dialog>
            }
            </div>
            )
        
    }
}

export default LoginPopup;