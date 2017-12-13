import React,{Component, PropTypes} from 'react';
import Utils from './utils/common.js';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

/*
 used for videoshow, requires video-data as well
 */
class UserCard extends Component {

    constructor(props) {
        super(props);
        this.showVideoData = this.showVideoData.bind(this);
        this.linkClick = this.linkClick.bind(this);
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

    linkClick( profileUrl ){
        //@todo route to profile
        window.location.href = profileUrl;
    }

    render(){
        return(
            <Card>
                <CardHeader
                    title={this.props.userInfo.name}
                    subtitle={this.props.userInfo.title}
                    avatar={this.props.userInfo.avatar}
                    onClick={this.linkClick.bind( null, this.props.userInfo.profileUrl )}
                />
                {this.showVideoData()}
            </Card>
        );
    }
}

export default UserCard;