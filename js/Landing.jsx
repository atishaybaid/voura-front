import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import '../less/landing.less';
import VrHeader from './VrHeader.jsx';


const Landing = ()=>(
    <div className="landing-page">
        <VrHeader/>
        <div className="main">
            <div className="info">
                <h1 className="pitch">A video community to share knowledge!</h1>
                <p className="slog">Learn Anywhere.Interact Anytime.</p>
                <FlatButton className="landing-btn" label="Join The Community" primary={true} 
                backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}}  href="/signup"
                 target="_blank"/>
            </div>
            

        </div>

    </div>
    
    );

export default Landing;