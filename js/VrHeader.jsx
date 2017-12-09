import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login.jsx';
import HorNav from './Menu.jsx';
import '../less/common.less';
import { withCookies, Cookies } from 'react-cookie';

const appTitle = 'intelverse';

class VrHeader extends Component {

    constructor(props) {
        super(props);
        this.utilSpace = null;
        if(this.utilSpace){
            this.utilSpace = <HorNav />
        } else {
            this.utilSpace = <Login />
        }
        this.utilSpace = <HorNav />
    }

    componentDidMount() {
        const { cookies } = this.props;
        const userId = cookies.get('userId');
        // check logged in status
        if(userId){
            this.utilSpace = <Login />
        } else {
            this.utilSpace = <HorNav />
        }
        this.utilSpace = <HorNav />
    }

    render(){
        return(<div className="app-header">
                {this.utilSpace}
            </div>
        )
    }

}

export default withCookies( VrHeader );