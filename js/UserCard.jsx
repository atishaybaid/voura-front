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
        this.linkProfileClick = this.linkProfileClick.bind(this);
        this.linkVideoClick = this.linkVideoClick.bind(this);
        this.showCardHeader = this.showCardHeader.bind(this);
        this.getVideoSubtitle = this.getVideoSubtitle.bind(this);
    }

    getVideoSubtitle(){
        var sd = new Date( this.props.videoData.broadcast.resource.snippet.scheduledStartTime )
        var ed = new Date( this.props.videoData.broadcast.resource.snippet.scheduledEndTime )
        return Utils.js_yyyy_mm_dd_hh_mm_ss( sd ) + ' - ' + Utils.js_yyyy_mm_dd_hh_mm_ss( ed );
    }

    showVideoData(){

        if( Utils.isEmpty( this.props.videoData ) )
            return '';
        
        if(  Utils.isNonEmptyObject(this.props.videoData.broadcast ) ){
            return (
                <div>
            <CardTitle title={this.props.videoData.broadcast.resource.snippet.title} subtitle={this.getVideoSubtitle()} />
            <CardText>
                {this.props.videoData.broadcast.resource.snippet.description}
            </CardText>
                    </div>
            );
        } else if( Utils.isNonEmptyObject( this.props.videoData ) ){
            return (
            <div>
                <CardTitle title={this.props.videoData.title } subtitle={this.props.videoData.subtitle} onClick={this.linkVideoClick.bind( null, this.props.videoData.videoUrl )}/>
                <CardText>
                    {this.props.videoData.description}
                </CardText>
            </div>
            )
        } else{
            return '';
        }
    }

    linkProfileClick( profileUrl ){
        //@todo route to profile
        //window.location.href = profileUrl;
        Utils.openInNewTab( profileUrl );
    }

    linkVideoClick( vidUrl ){
        //window.location.href = vidUrl;
        Utils.openInNewTab( vidUrl );
    }

    showCardHeader(){
        if( Utils.isNonEmptyObject(this.props.userInfo) ) {
            return (
                <CardHeader
                    title={this.props.userInfo.name}
                    subtitle={this.props.userInfo.title}
                    avatar={this.props.userInfo.image}
                    onClick={this.linkProfileClick.bind( null, Utils.getProfileUrlFromId( this.props.userInfo.userId ) )}
                />
            );
        }else{
            return null;
        }
    }
    render(){
        return(
            <Card>
                {this.showCardHeader()}
                {this.showVideoData()}
            </Card>
        );
    }
}

export default UserCard;