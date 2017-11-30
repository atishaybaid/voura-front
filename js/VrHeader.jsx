import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login.jsx';
const appTitle = 'intelverse'


const VrHeader = (props)=>{
        this.utilSpace = null;
        if(props.showLogin){
            this.utilSpace = <Login />
        }

    return(<div className="app-header">
                <AppBar
                title={appTitle}
                iconClassNameRight=""
                showMenuIconButton={false}
                 iconElementRight={this.utilSpace}
                /> 
            </div>
            )


}

export default VrHeader;