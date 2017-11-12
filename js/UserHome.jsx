import React,{Component} from 'react';
import VrHeader from './VrHeader.jsx'
import VrScheduleGrid from './VrScheduleGrid.jsx';

class UserHome extends Component{
    constructor(props){
        super(props)
        this.schApi = 'db';
    }
    render(){
        return(
            <div className="User-Home-page">
                <VrHeader/>
                <h1>hi user</h1>
                <VrScheduleGrid apiurl={this.schApi} fillClr={null} avlClr={null}/>
            </div>
            )
    }

}


export default UserHome;