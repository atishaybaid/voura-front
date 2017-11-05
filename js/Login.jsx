import React,{Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import '../less/common.less'

class LoginPopup extends Component {
    constructor(props){
        super(props);
        this.state={
            showDialog:false
        }
        this.handleLoginOnClick = this.handleLoginOnClick.bind(this)
    }
    handleLoginOnClick(){
        this.setState({showDialog:true})
    }
    handleSubmit(){
        console.log("handleSubmit called");
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
                    /><br />
        
                    <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    floatingLabelFixed={true}
                    type="password"
                    /><br />
                    <FlatButton label="Submit" onClick={this.handleSubmit}/>

                </div>
               
                </Dialog>
            }
            </div>
            )
        
    }
}

export default LoginPopup;