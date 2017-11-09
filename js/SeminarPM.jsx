import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import '../less/SeminarPM.less';
import {GetReq} from './utils/apiRequest.jsx';

//@todo fetch sem data on load itself
//@todo identify states
class SeminarPM extends Component {
    constructor(props) {
        super();
        this.state = {
            semState: 'FETCH_DATA',
            seminarId: 'MNt_-XqOkOI',
            seminarData: {},
            ctrlMessage: 'Press to fetch data'
        }
    };

    fetchSeminarData(){
        var path ='seminar/'+this.state.seminarId;
        var that = this;
        GetReq( path )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    console.log( response );
                    that.state.semState = 'PREVIEW_SEMINAR';
                    that.state.seminarData = response.data;
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSemControllerButtonClick(){

        switch(this.state.semState){
            case 'FETCH_DATA' :
                this.fetchSeminarData();
                break;
            case 'PREVIEW_SEMINAR':
                previewSeminar();
                break;
            case 'LIVE_SEMINAR':
                liveSeminar();
                break;
            case 'COMPLETE_SEMINAR':
                completeSeminar();
                break;
            default:
                fetchSeminarData();
                break;
        }

    }

    render(){
        return (
            <div className="seminarP-page">
                <VrHeader />
                <div className="main-container">
                    <div className="seminar-left-coloumn">
                        <div className="sem-controller">
                            <p>
                                {this.state.message}
                            </p>
                            <FlatButton className="control-btn" label={this.state.semState} primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleSemControllerButtonClick.bind(this)} target="_blank"/>
                        </div>
                        <div className="youtube-embed">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/WOoJh6oYAXE" frameBorder="0" gesture="media" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="seminar-right-coloumn">
                        <div className="pQuestion-list">
                            Question lsit
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SeminarPM;