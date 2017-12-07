import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import '../less/landing.less';

const Landing = ()=>(
    <div className="landing-page">
        <div className="main">
            <div className="info">
                <h1 className="pitch">A video community to share knowledge!</h1>
                <p className="slog">Learn Anywhere.Interact Anytime.</p>
                <FlatButton className="landing-btn" label="Join The Community" primary={true} 
                backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}}  href="/signup/newuser"
                 target="_blank"/>
            </div>
        </div>
    </div>
    
    );

export default Landing;