import React from 'react';
import AppBar from 'material-ui/AppBar';

const appTitle = 'Voura'



const VrHeader = () => (
    <AppBar
            title={appTitle}
            iconClassNameRight=""
            showMenuIconButton={false}
        /> 
    )


export default VrHeader;