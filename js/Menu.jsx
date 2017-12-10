import React,{Component, PropTypes} from 'react';
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

const homeIconStyle = {
    marginLeft: 24
}
class HorNav extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleCreateSemClick = this.handleCreateSemClick.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleHomeClick(){
        window.location.href = '/';
        //this.history.push('/my-new-location');
    }

    handleCreateSemClick(){
        //this.props.history.push('/seminar/create');
        //browserHistory.push( '/seminar/create' );
        window.location.href = '/seminar/create';
        //this.context.router.transitionTo( '/seminar/create' );
        //transitionTo('/seminar/create');
    }

    handleSearchClick(){
        window.location.href = '/search';
    }

    handleQAListClick(){
        window.location.href = '/qna-list';
    }

    handleNotiClick(){
        window.location.href = '/notifications';
    }

    logout(){
        const { cookies } = this.props;
        cookies.remove('user');
        cookies.remove('userId');

        requests.signout().then( function ( resolve ) {
            window.location.href = '/';
        });
    }

    showProfile(){
        window.location.href = '/profile';
    }

    logOut(){
        this.logout();
    }

    render() {
        return (
            <div className="menu-wrapper">
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
                    href="#"
                    target="_blank"
                    label="Search"
                    secondary={true}
                    icon={<SearchIcon />}
                    onClick={this.handleSearchClick}
                />
                            </li>
                        <li>
                <FlatButton
                    href="#"
                    target="_blank"
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
                    href="#"
                    target="_blank"
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
        )
    };

}
export default withCookies( HorNav );