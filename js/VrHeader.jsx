import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login.jsx';
import HorNav from './Menu.jsx';
import '../less/common.less';

const appTitle = 'intelverse'


const VrHeader = (props)=>{
        this.utilSpace = null;
        if(props.showLogin){
            this.utilSpace = <Login />
        }

    return(<div className="app-header">
            {this.utilSpace}
            <HorNav/>
            </div>
            )


}

export default VrHeader;