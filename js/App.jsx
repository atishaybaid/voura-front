import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ClientApp from './ClientApp.jsx';
import store from './store';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Seminar from './Seminar.jsx';
import UserHome from './UserHome.jsx';

const App = ()=>(
       <Provider store={store}>
            <MuiThemeProvider>
                <div className="app">
                    <Switch>
                        <Route  exact path="/" component={Landing} />
                        <Route   path="/signup/:page"  component={(props)=>{
                            return <Signup {...props} />
                            
                        }} />
                        <Route  exact path="/seminar/" component={Seminar} />
                        <Route path="/home" component={UserHome} />
                    </Switch>
                </div>
            </MuiThemeProvider>
        </Provider>
    );

export default App;


