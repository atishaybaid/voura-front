import React ,{ Component } from 'react';
import TextField from 'material-ui/TextField';
import {Step,Stepper,StepLabel} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import SignupCredential from './SignupCredential.jsx';
import UserDetails from './UserDetails.jsx';
import {PostReq} from './utils/apiRequest.jsx'
import '../less/signup.less'
import requests from './utils/requests';

class Signup extends Component {
    constructor(props){
        super();
         this.state = {
             stepIndex : 0,
             finished : false,
             utilSpace : null
         }
        this.credentialsSubmit = this.credentialsSubmit.bind(this);

        if(props.match.params.page === 'newuser'){
            this.state = {
                stepIndex : 0,
                utilSpace : <SignupCredential   onSubmit={this.credentialsSubmit} />
            }
        } else {
            this.state = {
                stepIndex : 1,
                utilSpace : <UserDetails />
            }
        }
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.page === 'newuser'){
            this.setState( {stepIndex : 0, utilSpace : <SignupCredential   onSubmit={this.credentialsSubmit} /> } );
        }

        if(nextProps.match.params.page === 'userdetails'){
            this.setState( { stepIndex : 1, utilSpace : <UserDetails /> } );
        }
    }
    
    
    credentialsSubmit(idata){
        //make ajax hit
        let data = {
            'id':idata.email,
            'password':idata.pass,
            'name':idata.name,
            'image':''
        }
        console.log(data);

        var that = this;
        requests.signup( data )
            .then( function ( resolve ) {
                //this.context.history.push('/signup/userdetails');
                that.setState({ stepIndex: 1, utilSpace : <UserDetails /> })
            }, function ( reject ) {

            });
        
    };
    render(){
        return(
            <div className="signup-page">
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
               {this.state.utilSpace}
                </div>
            </div>
            )
    }
}


export default Signup;