import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Landing from './Landing.jsx';

const App = ()=>(
    <BrowserRouter>
        <div className="app">
            <Route  exact path="/" component={Landing} />
        </div>
        
    </BrowserRouter>
    );


ReactDom.render(<App />,document.getElementById('app'));