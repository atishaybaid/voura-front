import React,{Component} from 'react';

class VideoDetail extends Component{
    constructor(props){
        super(props);
        this.videoId = this.props.id||'';
    }
    render(){
        return (
            <div className="VideoDetail">
              <iframe width="420" height="315" src={`https://www.youtube.com/embed/${this.videoId}`}></iframe>  
            </div>
            )
    }
}

export default VideoDetail;