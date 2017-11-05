import React ,{ Component } from 'react';
import TextField from 'material-ui/TextField';
import {Step,Stepper,StepLabel} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import VrHeader from './VrHeader.jsx';
import SignupCredential from './SignupCredential.jsx';
import UserDetails from './UserDetails.jsx';
import {PostReq} from './utils/apiRequest.jsx'
import '../less/signup.less'


class Signup extends Component {
    constructor(props){
        super();
        this.state ={
            finished: false,
            stepIndex: 0
        }
         this.credentialsSubmit = this.credentialsSubmit.bind(this);
         
         this.utilSpace = null;
         if(props.match.params.page === 'newuser'){
            this.utilSpace = <SignupCredential   onSubmit={this.credentialsSubmit} />
         }

         if(props.match.params.page === 'userdetails'){
            this.setState({stepIndex:1});
            this.utilSpace = <UserDetails />
         }



    };
    credentialsSubmit(idata){
        //make ajax hit
        let data = {
            'id':idata.email,
            'password':idata.pass,
            'name':'',
            'image':''
        }

        PostReq('users/signup',data)
            .then(function (response) {
               if(response.status == 200){
                window.location.href = '/signup/userdetails';

               }
           
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
               {this.utilSpace}   
                </div>

                
            </div>
            )
    }
}


export default Signup;