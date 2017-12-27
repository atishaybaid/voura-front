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
import requests from './utils/requests';
import PropTypes from 'prop-types';


const homeIconStyle = {
    marginLeft: 24
}
class HorNav extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleCreateSemClick = this.handleCreateSemClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleQAListClick = this.handleQAListClick.bind(this);
        this.handleNotiClick = this.handleNotiClick.bind(this);
        this.logout = this.logout.bind(this);
        this.showProfile = this.showProfile.bind(this);
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
        this.context.router.history.push( '/qna-list' )
    }

    handleNotiClick(){
        //window.location.href = '/notifications';
        this.context.router.history.push( '/notifications' )
    }

    logout(){
        var that = this;
        const { cookies } = this.props;
        cookies.remove('user');
        cookies.remove('userId');

        requests.signout().then( function ( resolve ) {
            window.location.href = '/';
            //that.context.router.history.push( '/home' )
        });
    }

    showProfile(){
        //window.location.href = '/profile';
        this.context.router.history.push( '/profile' )
    }

    render() {
        return (
            <header className="menu-wrapper">
                <div className="container">
                <nav className= "navbar navbar-default navbar-static-top" role = "navigation">
                    <ul className= "nav navbar-nav navbar-left">

                    <div className= "navbar-header">
                        <a className= "navbar-brand" href = "#">intelverse-logo</a>
                    </div>

                    <li className= "active">
                <FlatButton
                    label="Home"
                    secondary={true}
                    icon={<HomeIcon style={homeIconStyle}/>}
                    onClick={this.handleHomeClick.bind(this)}
                />
                    </li>
                 <li>
                <FlatButton
                    label="Create Seminar"
                    secondary={true}
                    icon={<ContentAdd />}
                    onClick={this.handleCreateSemClick}
                />
                     </li>
                        <li>
                <FlatButton
                    label="Search"
                    secondary={true}
                    icon={<SearchIcon />}
                    onClick={this.handleSearchClick}
                />
                            </li>
                        <li>
                <FlatButton
                    label="Questions List"
                    secondary={true}
                    icon={<QAIcon />}
                    onClick={this.handleQAListClick}
                />
                    </li>
                    </ul>
                    <ul className = "nav navbar-nav navbar-right">
                        <li>
                <FlatButton
                    label=""
                    secondary={true}
                    icon={<NotiIcon />}
                    onClick={this.handleNotiClick}
                />
                            </li>
                        <li>

                            <IconMenu
                                iconButtonElement={<IconButton><AccountIcon /></IconButton>}
                            >
                                <MenuItem value="profile" primaryText="Profile" onClick={this.showProfile}/>
                                <MenuItem value="logout" primaryText="Logout" onClick={this.logout}/>
                            </IconMenu>

                        </li>
                </ul>
            </nav>
            </div>
            </header>
        )
    };

}

HorNav.contextTypes = {
    router: PropTypes.object
}
export default withCookies( HorNav );