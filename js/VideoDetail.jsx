import React,{Component} from 'react';
import VrHeader from './VrHeader.jsx'

class VideoDetail extends Component{
    constructor(props){
        super(props);
       
        this.videoId = props.match.params.id||'';
    }
    render(){
         const {description,title} = this.props.location.state.videoData;
         console.log(this.props.location.state.videoData);
        return (
            <div className="VideoDetail">
            <VrHeader/>
            <div className="video-show-container">
                <p className="video-desc">{description}</p>
                <iframe width="840" height="472.5" src={`https://www.youtube.com/embed/${this.videoId}?autoplay=1`}
              frameBorder="0" allowFullScreen>
              </iframe> 
            </div>
               
            </div>
            )
    }
}

export default VideoDetail;