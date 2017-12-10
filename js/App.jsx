import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ClientApp from './ClientApp.jsx';
import store from './store';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Seminar from './Seminar.jsx';
import UserHome from './UserHome.jsx';
import Profile from './Profile.jsx';
import videoDetail from './VideoDetail.jsx';
import FreeQuestion from './FreeQuestion.jsx';
import QuestionList from './QuestionList.jsx';
import Notifications from './notifications.jsx';

/*import SeminarP from './SeminarP.jsx';*/
import SeminarPM from './SeminarPM.jsx';
/*import SeminarS from './SeminarS.jsx';*/
import SeminarSM from './SeminarSM.jsx';
import VideoShow from './VideoShow.jsx';
import VrHeader from './VrHeader.jsx';
import VrFooter from './VrFooter.jsx';

const App = ()=>(

       <Provider store={store}>
            <MuiThemeProvider>
                <div className="app">
                    <VrHeader />
                    <Switch>
                        <Route  exact path="/" component={Landing} />
                        <Route   path="/signup/:page"  component={(props)=>{
                            return <Signup {...props} />
                            
                        }} />
<Route  exact path="/seminar/create" component={Seminar} />
<Route  exact path="/seminar/PM/:semId" component={SeminarPM} />
<Route  exact path="/seminar/SM/:semId" component={SeminarSM} />
<Route  exact path="/add-question" component={FreeQuestion} />
<Route path="/question-list" component={QuestionList} />
<Route exact path="/videoshow/:videoId" component={VideoShow} />
                        <Route path="/home" component={UserHome} />
                        <Route path="/videoDetail/:id" component={videoDetail} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/notifications" component={Notifications} />
                    </Switch>

                </div>
            </MuiThemeProvider>
        </Provider>
    );

export default App;

