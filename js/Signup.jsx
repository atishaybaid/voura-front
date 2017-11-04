import React ,{ Component } from 'react';
import TextField from 'material-ui/TextField';
import {Step,Stepper,StepLabel} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import VrHeader from './VrHeader.jsx';
import '../less/signup.less'


class Signup extends Component {
    constructor(props){
        super();
        this.state ={
            finished: false,
             stepIndex: 0,
             email:'',
             pass:''
        }


    };
    handleEmailChange(event,newValue){
        this.setState({email:newValue});
    };
    handlePasswordChange(event,newValue){
        this.setState({pass:newValue});
    };
    handleContinue(){
        //make ajax hit
        let data = {
            'emailid':this.state.email,
            'password':this.state.pass,
            'name':'',
            'image':''
        }
        console.log(data);

        var axiosInstance = axios.create({
            baseURL: 'http://api.intelverse.com/',
            timeout: 5000,
            headers: {'Access-Control-Allow-Origin': '*'}
            });

        axiosInstance.post('users/signup',data)
            .then(function (response) {
                console.log(response);
            this.setState({stepIndex:1});
        })
        .catch(function (error) {
            console.log(error);
        });
        
    };
    render(){
        return(
            <div className="signup-page">
                <VrHeader />
                <div className="main-container">             
                  <div className="steeper">
                    <Stepper activeStep={this.state.stepIndex}>
                        <Step>
                            <StepLabel>Signup</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Add Interests</StepLabel>
                        </Step>
                    </Stepper>
                  </div>
                

                    <div className="siupform-container">
                        <h1 className="step-title">Sign up to join community</h1>
                        <p className="main-line">Just One More step and you're finished.</p>
                        <TextField
                            hintText="Email"
                            errorText="Email is required"
                            floatingLabelText="Email"
                            type="email"
                            onChange={this.handleEmailChange.bind(this)}
                            value={this.state.email}
                            /><br />
                        <TextField
                            hintText="Password"
                            errorText="Password is required"
                            floatingLabelText="Password"
                            type="password"
                            onChange={this.handlePasswordChange.bind(this)}
                            value={this.state.pass}
                            /><br />
                        <FlatButton className="landing-btn" label="CONTINUE" primary={true} 
                                backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleContinue.bind(this)}
                     target="_blank"/>
                    </div>
                </div>
                
            </div>
            )
    }
}


export default Signup;