import React ,{ Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {GetReq, PostReq} from './utils/apiRequest.jsx';
import {List, ListItem} from 'material-ui/List';
import { withCookies, Cookies } from 'react-cookie';
import iVConfigs from '../Configs/local.json';
import io from "socket.io-client";
import  {connect} from 'react-redux';

class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // true when following, false when not following
            notiList: []
        }
        //const FOLLOWING = 'FOLLOWING';
    }

    socketHandling(){

        const { cookies } = this.props;

        const userId = cookies.get('userId');
        //console.log( 'userId:' + userId );

        var that = this;
        var sockConfigs = iVConfigs.notifications.socketData;

        sockConfigs['query'] = "userId="+userId;
        var notiSocket = io.connect( iVConfigs.notifications.socketUrl, sockConfigs );

        this.notiSocket = notiSocket;
        notiSocket.on('connect', function(){
        });;
        notiSocket.on('getNoti', function() {

        }

    }

    componentDidMount() {
        var that = this;
        that.socketHandling();
    }

    generateNotiList(){
        var that = this;
        if( this.state.notiList.length > 0 ) {
            var notiList = this.state.notiList.map(function (item) {
                return <div key={item._id}>
                    <ListItem primaryText={item.question}/>
                    <FlatButton className="control-btn" label='answered' primary={true} backgroundColor={'#4ebcd5'}
                                style={{color:'#ffffff'}} onClick={that.answeredQuestion.bind( this, item._id ) }
                                target="_blank"/>
                    <FlatButton className="control-btn" label='skip' primary={true} backgroundColor={'#4ebcd5'}
                                style={{color:'#ffffff'}} onClick={that.skipQuestion.bind( this, item._id ) }
                                target="_blank"/>
                </div>
            })
            //console.log( quesList );
            return notiList;
        }
    }

    render() {
        return (
            <div>
                {this.generateNotiList()}
            </div>
        )
    }
}

export default Notifications;