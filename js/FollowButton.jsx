import React ,{ Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import '../less/SeminarPM.less';
import requests from './utils/requests';

const FOLLOWING = 'UNFOLLOW';
const NOT_FOLLOWING = 'FOLLOW';

class FollowButton extends Component {

    constructor(props) {
        super(props);
        var userId = window.location.pathname.match(/([^\/]*)\/*$/)[1];
        this.state = {
            userId: userId,
            // true when following, false when not following
            followStatus: ""
        }
        //const FOLLOWING = 'FOLLOWING';
        this.handleFollowUnfollow = this.handleFollowUnfollow.bind(this);
        this.generateFollowBtn = this.generateFollowBtn.bind(this);
    }

    componentDidMount() {
        //inititlly show loading message

        //get infor about videoid
        var that = this;
        requests.getFollowStatus( this.state.userId )
            .then( function ( resolve ) {
                if( resolve.follows == false ){
                    that.setState({ followStatus: FOLLOWING });
                } else {
                    that.setState({ followStatus: NOT_FOLLOWING });
                }
            });
    }

    handleFollowUnfollow(){
        if( !this.state.followStatus ){
            return;
        } else if( this.state.followStatus == FOLLOWING ){
            var path = 'users/unfollows?id=' + this.state.userId;
        } else {
            var path = 'users/follows?id=' + this.state.userId;
        }

        var that = this;

        requests.handleFollowUnfollow(path)
            .then( function (resolve) {
                console.log( resolve );
                if( that.state.followStatus == FOLLOWING )
                    that.setState({followStatus: NOT_FOLLOWING})
                else
                    that.setState({followStatus: FOLLOWING})

            }, function ( reject ) {

            })
    }

    generateFollowBtn(){
        if( !this.state.followStatus ){
            return ;
        } else if( this.state.followStatus == FOLLOWING ){
            var label = NOT_FOLLOWING;
        } else {
            var label = FOLLOWING;
        }
        return (
            <FlatButton className="control-btn" label={label} primary={true}
                        backgroundColor={'#4ebcd5'} style={{color:'#ffffff'}}
                        onClick={ this.handleFollowUnfollow.bind(this) } target="_blank"/>
        );
    }

    render(){
        return (
            <div className="follow-btn">
                {this.generateFollowBtn()}
            </div>
        )
    }

}

export  default FollowButton;