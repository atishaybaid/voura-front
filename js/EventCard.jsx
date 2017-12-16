import React,{Component, PropTypes} from 'react';
import Utils from './utils/common.js';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// get eventInfo, userInfo from props
class EventCard extends Component {

    constructor(props) {
        super(props);
        this.showVideoData = this.showVideoData.bind(this);
        this.linkClick = this.linkClick.bind(this);
    }

    render(){
        return(
            <Card>
                <CardHeader
                    title={this.props.eventInfo.name}
                    subtitle={this.props.eventInfo.dateTimeString}
                    avatar={this.props.userInfo.avatar}
                    onClick={this.linkClick.bind( null, this.props.eventInfo.profileUrl )}
                />
                {this.showVideoData()}
            </Card>
        );
    }
}

export default EventCard;