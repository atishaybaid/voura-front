import React ,{ Component } from 'react';
import TextField from 'material-ui/TextField';
import {Step,Stepper,StepLabel} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import VrHeader from './VrHeader.jsx';
import SignupCredential from './SignupCredential.jsx';
import UserDetails from './UserDetails.jsx';
import '../less/signup.less'


class Signup extends Component {
    constructor(props){
        super();
        this.state ={
            finished: false,
             stepIndex: 0
        }
         this.utilSpace = null;
         console.log(props);
         if(props.match.params.page === 'newuser'){
            this.utilSpace = <SignupCredential   onSubmit={this.credentialsSubmit.bind(this)}/>
         }

         if(props.match.params.page === 'userdetails'){

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
        console.log(data);

        console.log("on onSubmit called");

        var axiosInstance = axios.create({
            baseURL: 'http://lapis.intelverse.com:3000/',
            timeout: 5000,
            headers: {'Access-Control-Allow-Origin': '*'}
            });

        axiosInstance.post('users/signup',data)
            .then(function (response) {
                console.log(response);
           
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