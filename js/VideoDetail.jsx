import React,{Component} from 'react';
import VrHeader from './VrHeader.jsx'
import {connect} from 'react-redux';
import {fetchQuestions} from './actionCreators.js';

class VideoDetail extends Component{
    constructor(props){
        super(props);
       
        this.videoId = props.match.params.id||'';
    }
    componentDidMount(){
        //this.props.fetchQuestions(this.videoId);
    }
    render(){
    const {description,title} = this.props.location.state.videoData;
        return (
            <div className="VideoDetail">
            <VrHeader/>
            <div className="video-show-container">
                <p className="video-desc">{description}</p>
                <iframe width="840" height="472.5" src={`https://www.youtube.com/embed/${this.videoId}?autoplay=1`}
              frameBorder="0" allowFullScreen>
              </iframe> 
            </div>

            <div className="quest-container">
               
            </div>
               
            </div>
            )
    }
};

/*const mapStateToProps = (state)=>({videoQuestion:state.video.questionData,videoData:state.home.videoData})
const mapDispatchToProps = (dispatch)=>({
    fetchQuestions:function(videoId){
        dispatch(fetchQuestions(videoId));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(VideoDetail);*/

export default VideoDetail;