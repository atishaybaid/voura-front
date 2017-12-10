import React,{Component, PropTypes} from 'react';
import Utils from './utils/common.js';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class UserCard extends Component {

    constructor(props) {
        super(props);
        this.showVideoData = this.showVideoData.bind(this);
    }

    showVideoData(){
        if( Utils.isNonEmptyObject(this.props.videoData) ){
            return (
                <div>
            <CardTitle title={this.props.videoData.broadcast.resource.snippet.title} subtitle={this.props.videoData.broadcast.resource.snippet.scheduledStartTime} />
            <CardText>
                {this.props.videoData.broadcast.resource.snippet.description}
            </CardText>
                    </div>
            );
        }else{
            return '';
        }
    }
    render(){
        return(
            <Card>
                <CardHeader
                    title={this.props.userInfo.name}
                    subtitle={this.props.userInfo.title}
                    avatar="images/jsa-128.jpg"
                />
                {this.showVideoData()}
            </Card>
        );
    }
}

export default UserCard;