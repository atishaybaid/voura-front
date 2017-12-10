import React ,{ Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import '../less/SeminarPM.less';
import {GetReq, PostReq} from './utils/apiRequest.jsx';

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
    }

    getFollowStatus(){
        var path ='users/isfollows?id='+this.state.userId;
        var that = this;
        var promise = new Promise( function ( resolve, reject ) {
            GetReq( path )
                .then(function (response) {
                    console.log(response.status);
                    if(response.status == 200){
                        resolve( response.data.data );
                    } else {
                        reject( response );
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    return error;
                });
        });
        return promise;
    }

    componentDidMount() {
        //inititlly show loading message

        //get infor about videoid
        var that = this;
        this.getFollowStatus()
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
        var promise = new Promise( function ( resolve, reject ) {
            GetReq( path )
                .then(function (response) {
                    console.log(response.status);
                    if(response.status == 200){
                        resolve( response.data.data );
                    } else {
                        reject( response );
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    return error;
                });
        });
        promise
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