import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import  {connect} from 'react-redux';
import {signupSetEmail,
        signupSetPassword,signupSetPassword2,signupSetName} from './actionCreators.js';
import Utils from './utils/common.js';

class SignUpCredentail extends Component {
    constructor(props){
        super();
        this.state = {
            nameErrorText : '',
            emailErrorText : '',
            passErrorText : "",
            pass2ErrorText : ''
        }
       this.handleContinue = this.handleContinue.bind(this);
       this.onNameBlur = this.onNameBlur.bind(this);
        this.onEmailBlur = this.onEmailBlur.bind(this);
        this.onPassBlur = this.onPassBlur.bind(this);
        this.onPass2Blur = this.onPass2Blur.bind(this);

    };

    handleContinue(){
        this.props.onSubmit({email:this.props.email,pass:this.props.password,name:this.props.name});
    }

    onPassBlur(){
        if( Utils.isEmpty( this.props.password ) || this.props.password.length < 1 ) {
            this.setState({passErrorText: 'Please enter password'});
        } else {
            this.setState({passErrorText: ''});
        }
    }

    onPass2Blur(){
        if( Utils.isEmpty( this.props.password ) || Utils.isEmpty( this.props.pass2 )  || this.props.password != this.props.pass2 ) {
            this.setState({pass2ErrorText: "Passwords don't match"});
        } else {
            this.setState({pass2ErrorText: ''});
        }
    }

    onEmailBlur(){
        if( Utils.isEmpty( this.props.email )  || this.props.email.length < 1 ) {
            this.setState({emailErrorText: 'Please enter email'});
        } else {
            this.setState({emailErrorText: ''});
        }
    }
    onNameBlur(){
        if( Utils.isEmpty( this.props.name )  || this.props.name.length < 1 ) {
            this.setState({nameErrorText: 'Please enter name'});
        } else {
            this.setState({nameErrorText: ''});
        }
    }


    render(){
        return(    
           <div className="siupform-container">
            <h1 className="step-title">Sign up to join community</h1>
            <p className="main-line">Just One More step and you're finished.</p>
                 <TextField
                    hintText="Name"
                    errorText={this.state.nameErrorText}
                    floatingLabelText="Name"
                    type="text"
                    onChange={this.props.handleNameChange}
                    value={this.props.name}
                    onBlur={this.onNameBlur}
                /><br />
                <TextField
                    hintText="Email"
                    errorText={this.state.emailErrorText}
                    floatingLabelText="Email"
                    type="email"
                    onChange={this.props.handleEmailChange}
                    value={this.props.email}
                    onBlur={this.onEmailBlur}
                /><br />
                <TextField
                    hintText="Password"
                    errorText={this.state.passErrorText}
                    floatingLabelText="Password"
                    type="password"
                    onChange={this.props.handlePasswordChange}
                    value={this.props.password}
                    onBlur={this.onPassBlur}
                /><br />
               <TextField
                   hintText="Re type Password"
                   errorText={this.state.pass2ErrorText}
                   floatingLabelText="Re type Password"
                   type="password"
                   onChange={this.props.handlePassword2Change}
                   value={this.props.pass2}
                   onBlur={this.onPass2Blur}
               /><br />
                <FlatButton className="landing-btn" label="CONTINUE" primary={true}  backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} 
                    onClick={this.handleContinue} />
            </div>
            )
         
    }

}



const mapStateToProps = (state) =>({email:state.signup.email,password:state.signup.pass,name:state.signup.name, pass2:state.signup.pass2 });
const mapDispatchToProps = (dispatch)=>({
    handleEmailChange:function(event,newValue){
        dispatch(signupSetEmail(newValue))
    },
    handlePasswordChange:function(event,newValue){
        dispatch(signupSetPassword(newValue))
    },
    handlePassword2Change:function(event,newValue){
        dispatch(signupSetPassword2(newValue))
    },
    handleNameChange:function(event,newValue){
        dispatch(signupSetName(newValue))
    }

})

export default connect(mapStateToProps,mapDispatchToProps)(SignUpCredentail)
