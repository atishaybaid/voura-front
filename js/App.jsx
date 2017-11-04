import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';

const App = ()=>(
    <BrowserRouter>

        <MuiThemeProvider>
            <div className="app">
                <Switch>
                    <Route  exact path="/" component={Landing} />
                    <Route  exact path="/signup/:page" component={Signup} />
                </Switch>
            </div>
        </MuiThemeProvider>
        
    </BrowserRouter>
    );


ReactDom.render(<App />,document.getElementById('app'));