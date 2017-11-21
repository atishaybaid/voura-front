import React,{Component} from 'react';
import VrHeader from './VrHeader.jsx'
import VrScheduleGrid from './VrScheduleGrid.jsx';
import {connect} from 'react-redux';
import {fetchVideoData} from './actionCreators.js';



class UserHome extends Component{
    constructor(props){
        super(props)
        this.schApi = 'db';
    }
    componentDidMount(){
        this.props.getVideoData();
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
const mapStateToProps = (state) =>({videoData:state.home.videoData})
const mapDispatchToProps =(dispatch)=>({
    getVideoData:function(){
        console.log("getVideoData");
        dispatch(fetchVideoData());
    }

})
export default connect(mapStateToProps,mapDispatchToProps)(UserHome);