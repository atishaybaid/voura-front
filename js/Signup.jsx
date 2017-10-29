import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
import TextField from 'material-ui/TextField';



/*class Signup extend Component{
    constructor()
}*/


const Signup =  () => (
    <div className="signup-page">
        <VrHeader />
        <div className="details">
        <h1>Provide some details,for best experiance</h1>
        <TextField
        hintText="Your Name"
        errorText="Provide Your Name"
        /><br />
        <TextField
        hintText="Your Email"
        errorText="Provide Your Emai"
        /><br />
         <TextField
        hintText="Password"
        type="password"
        errorText="Provide a password"

        /><br />
        <h2>Education</h2>
        <TextField
        hintText="Degree"
        errorText="Provide Your Degree"
        /><br />
        <TextField
        hintText="Field of Study"
        errorText="Provide Your Field"
        /><br />




        </div>
    </div>
    )

export default Signup;