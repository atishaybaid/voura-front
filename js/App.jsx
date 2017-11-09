import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Seminar from './Seminar.jsx';


const App = ()=>(
    <BrowserRouter>
        <Provider store={store}>
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
        </Provider>
    </BrowserRouter>
    );


ReactDom.render(<App />,document.getElementById('app'));