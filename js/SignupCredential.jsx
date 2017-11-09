import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import  {connect} from 'react-redux';
import {signupSetEmail,
        signupSetPassword} from './actionCreators.js';
class SignUpCredentail extends Component {
    constructor(props){
        super();
       this.handleContinue = this.handleContinue.bind(this);

    };
    handleContinue(){
        this.props.onSubmit({email:this.props.email,pass:this.props.pass});
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
                    onChange={this.props.handleEmailChange}
                    value={this.props.email}
                /><br />
                <TextField
                    hintText="Password"
                    errorText="Password is required"
                    floatingLabelText="Password"
                    type="password"
                    onChange={this.props.handlePasswordChange}
                    value={this.props.pass}
                /><br />
                <FlatButton className="landing-btn" label="CONTINUE" primary={true}  backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} 
                    onClick={this.handleContinue} />
            </div>
            )
         
    }

}



const mapStateToProps = (state) =>({email:state.signup.email,password:state.signup.pass});
const mapDispatchToProps = (dispatch)=>({
    handleEmailChange:function(event,newValue){
        dispatch(signupSetEmail(newValue))
    },
    handlePasswordChange:function(event,newValue){
        dispatch(signupSetPassword(newValue))
    }

})

export default connect(mapStateToProps,mapDispatchToProps)(SignUpCredentail)
