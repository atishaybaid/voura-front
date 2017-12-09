import React,{Component, PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import HomeIcon from 'material-ui-icons/Home';
import FlatButton from 'material-ui/FlatButton';

class BottomHorNav extends Component {

    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
                <div className="footer">
                    <nav className = "navbar navbar-default" role = "navigation">
                        <div className = "navbar-header">
                            <a className = "navbar-brand" href = "#">intelverse-logo</a>
                        </div>

                        <ul className = "nav navbar-nav">
                        <li><a href = "/about-us">About</a></li>
                        <li><a href = "/privacy">Privacy</a></li>
                        <li><a href = "/terms">Terms</a></li>
                        <li><a href = "/contact-us">Contact</a></li>
                        <li><a href = "/sitemaps">Sitemap</a></li>
                        </ul>
                        <div>
                            <p className = "navbar-text navbar-right">
                                © Copyright 2017. All Rights Reserved.
                            </p>
                        </div>

                        </nav>
                </div>
            </div>
        )
    }
}

export default BottomHorNav;