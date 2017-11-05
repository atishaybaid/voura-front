import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Seminar from './Seminar.jsx';

const App = ()=>(
    <BrowserRouter>

        <MuiThemeProvider>
            <div className="app">
                <Switch>
                    <Route  exact path="/" component={Landing} />
                    <Route   path="/signup/:page"  component={(props)=>{
                        return <Signup {...props} />
                        
                    }} />
<Route  exact path="/seminar/" component={Seminar} />
                </Switch>
            </div>
        </MuiThemeProvider>
        
    </BrowserRouter>
    );


ReactDom.render(<App />,document.getElementById('app'));