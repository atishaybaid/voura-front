import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
class SignUpCredentail extends Component {
    constructor(props){
        super();
        this.state ={
             email:'',
             pass:''
        }
       this.handleEmailChange = this.handleEmailChange.bind(this);
       this.handlePasswordChange = this.handlePasswordChange.bind(this);
       this.handleContinue = this.handleContinue.bind(this);

    };
    handleEmailChange(event,newValue){
        this.setState({email:newValue});
    };
    handlePasswordChange(event,newValue){
        this.setState({pass:newValue});
    };
    handleContinue(){
        this.props.onSubmit(this.state);
    }
    render(){
        return(    
           <div className="siupform-container">
            <h1 className="step-title">Sign up to join community</h1>
            <p className="main-line">Just One More step and you're finished.</p>
                <TextField
                    hintText="Email"
                    errorText="Email is required"
                    floatingLabelText="Email"
                    type="email"
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                /><br />
                <TextField
                    hintText="Password"
                    errorText="Password is required"
                    floatingLabelText="Password"
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.pass}
                /><br />
                <FlatButton className="landing-btn" label="CONTINUE" primary={true}  backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} 
                    onClick={this.handleContinue} />
            </div>
            )
         
    }

}


export default SignUpCredentail;