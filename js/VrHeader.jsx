import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login.jsx';
const appTitle = 'Voura'



class VrHeader extends Component{
    constructor(props){
        super(props);
        
        this.utilSpace = null;
        
        if(props.showLogin){
            this.utilSpace = <Login />
        }
       
        
    }
    render(){
        return(
            <div className="app-header">
                <AppBar
                title={appTitle}
                iconClassNameRight=""
                showMenuIconButton={false}
                 iconElementRight={this.utilSpace}
                /> 
               

            </div>
            
            )
        
    }
}

/*const VrHeader = () => (
    
    )*/


export default VrHeader;