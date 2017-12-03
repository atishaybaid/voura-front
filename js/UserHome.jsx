import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import VrHeader from './VrHeader.jsx'
import VrScheduleGrid from './VrScheduleGrid.jsx';
import {connect} from 'react-redux';
import {fetchVideoData} from './actionCreators.js';
import '../less/home.less';


class UserHome extends Component{
    constructor(props){
        super(props)
        this.schApi = 'db';
        this.genVideoListMarkup = this.genVideoListMarkup.bind(this);
    }
    genVideoListMarkup(){
        console.log(this.props.videoData);
        if(this.props.videoData.videos){
            console.log("inside component");
           let videoList = this.props.videoData.videos.mongo.map((videoItem)=>(
            <div className="video-item" key={videoItem.videoId}> 
           
            <Link to={{pathname:`/videoDetail/${videoItem.videoId}`,
                       state:{videoData:videoItem} 
                   }}>
                <img src={videoItem.thumbImage} alt="" width="200px" height="200px"/>
                <span className="video-title">{videoItem.description}</span>
            </Link>
            </div>
            ))
            return  videoList;

        }
        
    }
    componentDidMount(){
        this.props.getVideoData();
    }


    render(){
        return(
            <div className="User-Home-page">
                
                <h1>Hi Atishay</h1>
                <h1>Recommended videos for you</h1>
                <div className="video-list-container">
                {this.genVideoListMarkup()}
                   
                </div>
                <VrScheduleGrid apiurl={this.schApi} fillClr={null} avlClr={null}/>
                


            </div>
            )
    }

}
const mapStateToProps = (state) =>({videoData:state.home.videoData})
const mapDispatchToProps =(dispatch)=>({
getVideoData:function(){
        dispatch(fetchVideoData());
    }

})
export default connect(mapStateToProps,mapDispatchToProps)(UserHome);