import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login.jsx';
import BottomHorNav from './BottomMenu.jsx';
import '../less/common.less';


const VrFooter = (props)=>{

    return(<div className="app-footer container">
            <BottomHorNav/>
        </div>
    )


}

export default VrFooter;