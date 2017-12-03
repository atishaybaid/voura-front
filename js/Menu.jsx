import React,{Component, PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import HomeIcon from 'material-ui-icons/Home';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SearchIcon from 'material-ui/svg-icons/action/search';
import QAIcon from 'material-ui/svg-icons/action/question-answer';
import NotiIcon from 'material-ui/svg-icons/social/notifications';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';

import { Link } from 'react-router'
import { browserHistory } from 'react-router'

const homeIconStyle = {
    marginLeft: 24
}
class HorNav extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleCreateSemClick = this.handleCreateSemClick.bind(this);
    }

    handleHomeClick(){

        //this.history.push('/my-new-location');
    }

    handleCreateSemClick(){
        //this.props.history.push('/seminar/create');
        //browserHistory.push( '/seminar/create' );
        this.props.history.push('/seminar/create');
        this.context.router.transitionTo( '/seminar/create' );
        //transitionTo('/seminar/create');
    }

    render() {
        return (
            <div>
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
                    href="#"
                    target="_blank"
                    label="Search"
                    secondary={true}
                    icon={<SearchIcon />}
                />
                <FlatButton
                    href="#"
                    target="_blank"
                    label="Questions List"
                    secondary={true}
                    icon={<QAIcon />}
                />
                <FlatButton
                    href="#"
                    target="_blank"
                    label=""
                    secondary={true}
                    icon={<NotiIcon />}
                />
                <FlatButton
                    href="#"
                    target="_blank"
                    label="Profile"
                    secondary={true}
                    icon={<AccountIcon />}
                />
            </div>
        )
    };

}
export default HorNav;