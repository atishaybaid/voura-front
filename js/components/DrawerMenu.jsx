import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SearchIcon from 'material-ui/svg-icons/action/search';
import QAIcon from 'material-ui/svg-icons/action/question-answer';
import NotiIcon from 'material-ui/svg-icons/social/notifications';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import HomeIcon from 'material-ui-icons/Home';
import Login from '../Login';

const homeIconStyle = {
    marginLeft: 10
}

class DrawerMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loggedIn: false
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLeftIconButtonClick = this.handleLeftIconButtonClick.bind(this);
        this.titleClick = this.titleClick.bind(this);
        this.handleHomeClick = this.handleHomeClick.bind(this);
        this.handleCreateSemClick = this.handleCreateSemClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleQAListClick = this.handleQAListClick.bind(this);
        this.handleNotiClick = this.handleNotiClick.bind(this);
        this.logout = this.logout.bind(this);
        this.showProfile = this.showProfile.bind(this);
        
    }

    componentDidMount(){
        const { cookies } = this.props;
        const userId = cookies.get('userId');
        if( userId ){
            this.setState({loggedIn: true});
        }
    }
    
    handleToggle(){
        this.setState({open: !this.state.open});
    }

    handleClose(){
        console.log('closed');
        this.setState({open: false});
    }

    handleLeftIconButtonClick(){
        this.handleToggle();
    }

    titleClick(){
        this.handleToggle();
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
            //window.location.href = '/';
            that.context.router.history.push( '/' )
        });
    }

    showProfile(){
        //window.location.href = '/profile';
        this.context.router.history.push( '/profile' )
    }

    getLoggedInMenu(){
        return(
            <div className="drawer-menu">
                <AppBar
                    title="Menu"
                    showMenuIconButton={true}
                    iconElementLeft={<IconButton><MenuIcon /></IconButton>}
                    onLeftIconButtonClick={this.handleLeftIconButtonClick}
                    iconElementRight={<NotiIcon />}
                    onRightIconButtonClick={this.handleNotiClick}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem leftIcon={<HomeIcon style={homeIconStyle}/>} primaryText="Home" onClick={this.handleHomeClick} />
                    <MenuItem leftIcon={<ContentAdd />} primaryText="Create Seminar" onClick={this.handleCreateSemClick} />
                    <MenuItem leftIcon={<SearchIcon />} primaryText="Search" onClick={this.handleSearchClick} />
                    <MenuItem value="logout" primaryText="Logout" onClick={this.logout}/>
                </Drawer>
            </div>
        )
    }

    getNonLoggedInMenu(){
        return (
            <AppBar
                title="Welcome to intelverse"
                showMenuIconButton={false}
                iconElementRight={<Login />}
            />
        );
    }

    render(){
        { return this.state.loggedIn ? this.getLoggedInMenu() : this.getNonLoggedInMenu() }
    }

}


DrawerMenu.contextTypes = {
    router: PropTypes.object
}
export default withCookies( DrawerMenu );