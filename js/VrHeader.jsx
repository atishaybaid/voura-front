import React,{Component} from 'react';
import ToolbarMenu from './components/ToolbarMenu';
import DrawerMenu from './components/DrawerMenu';

import '../less/common.less';
import { withCookies, Cookies } from 'react-cookie';

const appTitle = 'intelverse';

class VrHeader extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.isMobile = this.isMobile.bind(this);

            if( this.isMobile() ){
                this.utilSpace = <DrawerMenu />
            } else {
                this.utilSpace = <ToolbarMenu />
            }
    }

    isMobile(){
        return false;
    }

    componentDidMount() {
            if( this.isMobile() ){
                this.utilSpace = <DrawerMenu />
            } else {
                this.utilSpace = <ToolbarMenu />
            }
    }

    render(){
        return(<div className="app-header">
                {this.utilSpace}
            </div>
        )
    }

}

export default withCookies( VrHeader );