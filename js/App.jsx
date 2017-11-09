import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Seminar from './Seminar.jsx';
/*import SeminarP from './SeminarP.jsx';*/
import SeminarPM from './SeminarPM.jsx';
/*import SeminarS from './SeminarS.jsx';*/
import SeminarSM from './SeminarSM.jsx';

/*<Route  exact path="/seminar/P/:semId" component={SeminarP} />
 <Route  exact path="/seminar/S/:semId" component={SeminarS} />*/
const App = ()=>(
    <BrowserRouter>

        <MuiThemeProvider>
            <div className="app">
                <Switch>
                    <Route  exact path="/" component={Landing} />
                    <Route   path="/signup/:page"  component={(props)=>{
                        return <Signup {...props} />
                        
                    }} />
<Route  exact path="/seminar/create" component={Seminar} />
<Route  exact path="/seminar/PM/:semId" component={SeminarPM} />
<Route  exact path="/seminar/SM/:semId" component={SeminarSM} />
                </Switch>
            </div>
        </MuiThemeProvider>
        
    </BrowserRouter>
    );


ReactDom.render(<App />,document.getElementById('app'));