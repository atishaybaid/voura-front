import React,{Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import HomeIcon from 'material-ui-icons/Home';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
    import SearchIcon from 'material-ui/svg-icons/action/search';
import QAIcon from 'material-ui/svg-icons/action/question-answer';
import NotiIcon from 'material-ui/svg-icons/social/notifications';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { withCookies, Cookies } from 'react-cookie';
import requests from '../utils/requests';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Login from '../Login';
import Utils from '../utils/common';

const homeIconStyle = {
    marginLeft: 10
}
class ToolbarMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loggedIn: false
        };
        this.handleCreateSemClick = this.handleCreateSemClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleQAListClick = this.handleQAListClick.bind(this);
        this.handleNotiClick = this.handleNotiClick.bind(this);
        this.logout = this.logout.bind(this);
        this.showProfile = this.showProfile.bind(this);
        this.handleAskQuestion = this.handleAskQuestion.bind(this);
        this.handleHomeClick = this.handleHomeClick.bind(this);
        this.getLoggedInMenu = this.getLoggedInMenu.bind(this);
        this.getNonLoggedInMenu = this.getNonLoggedInMenu.bind(this);
    }

    componentDidMount(){
        const { cookies } = this.props;
        const userId = cookies.get('userId');
        if( userId ){
            this.setState({loggedIn: true});
        }
    }

    handleHomeClick(){
        //window.location.href = '/';
        //this.history.push('/my-new-location');
        this.context.router.history.push( '/' )
    }

    handleCreateSemClick(){
        //this.props.history.push('/seminar/create');
        //browserHistory.push( '/seminar/create' );
        //window.location.href = '/seminar/create';
        //this.context.router.transitionTo( '/seminar/create' );
        //this.context.router.push( '/seminar/create' );
        this.context.router.history.push( '/seminar/create' )
        //transitionTo('/seminar/create');
    }

    handleSearchClick(){
        this.context.router.history.push( '/search' )
    }

    handleQAListClick(){
        //window.location.href = '/qna-list';
        this.context.router.history.push( '/questions-list' )
    }

    handleNotiClick(){
        //window.location.href = '/notifications';
        this.context.router.history.push( '/notifications' )
    }

    handleAskQuestion(){
        this.context.router.history.push( '/add-question' );
    }

    logout(){
        var that = this;
        const { cookies } = this.props;
        cookies.remove('user');
        cookies.remove('userId');

        requests.signout().then( function ( resolve ) {
            window.location.href = '/';
            //that.context.router.history.push( '/' )
        });
    }

    showProfile(){
        //window.location.href = '/profile';
        /*var url = Utils.getProfileEditUrl( Utils.getCookie('userId') );
        this.context.router.history.push( url );*/
        var url = Utils.getProfileUrl( Utils.getCookie('userId') );
        this.context.router.history.push( url );
    }

    getLoggedInMenu(){
        return(
            <div className="toolbar-menu">
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle text="intelverse-logo" />
                        <FlatButton
                            label="Home"
                            secondary={true}
                            icon={<HomeIcon style={homeIconStyle}/>}
                            onClick={this.handleHomeClick.bind(this)}
                        />
                        <FlatButton
                            label="Create Seminar"
                            secondary={true}
                            icon={<ContentAdd />}
                            onClick={this.handleCreateSemClick}
                        />
                        <FlatButton
                            label="Search"
                            secondary={true}
                            icon={<SearchIcon />}
                            onClick={this.handleSearchClick}
                        />
                        <FlatButton
                            label="Questions List"
                            secondary={true}
                            icon={<QAIcon />}
                            onClick={this.handleQAListClick}
                        />
                        <FlatButton
                            label="Ask a question"
                            secondary={true}
                            icon={<ContentAdd />}
                            onClick={this.handleAskQuestion}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconMenu
                            iconButtonElement={<IconButton><AccountIcon /></IconButton>}
                        >
                            <MenuItem value="profile" primaryText="Profile" onClick={this.showProfile}/>
                            <MenuItem value="logout" primaryText="Logout" onClick={this.logout}/>
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }

    getNonLoggedInMenu(){
        return(
            <div className="toolbar-menu">
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle text="Login into intelverse" />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <Login />
                    </ToolbarGroup>
               </Toolbar>
            </div>
                        )
    }

    render(){
        { return this.state.loggedIn ? this.getLoggedInMenu() : this.getNonLoggedInMenu() }
    }

}


ToolbarMenu.contextTypes = {
    router: PropTypes.object
}
export default withCookies( ToolbarMenu );