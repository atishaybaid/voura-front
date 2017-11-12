import React ,{ Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import VrHeader from './VrHeader.jsx';
import axios from 'axios';
import iVCommonUtils from '../Utils/common';
//import {iVConfigs} from '../Configs/local.js';
import iVConfigs from '../Configs/local.json';

class Seminar extends Component {
    constructor(props){
        super();
        this.state ={
            title:'',
            description: '',
            tags: '',
            startDate: new Date(),
            startTime: new Date(),
            endDate: new Date(),
            endTime: new Date(),
            thumbnail:''
        }
    };

    handleTitleChange(event,newValue){
        this.setState({title:newValue});
    };
    handleDescriptionChange(event,newValue){
        this.setState({description:newValue});
    };
    handleTagsChange(event,newValue){
        this.setState({tags:newValue});
    };

    handleStartDate(event,newValue){
        this.setState({startDate:newValue});
    };
    handleStartTime(event,newValue){
        this.setState({startTime:newValue});
    };
    handleEndDate(event,newValue){
        this.setState({endDate:newValue});
    };
    handleEndTime(event,newValue){
        this.setState({endTime:newValue});
    };

    handleSubmit(event,newValue){

        let data = {
            "requestee":"101",
            "bTags": iVCommonUtils.getArrFromStr( this.state.tags ),
            "bTitle": this.state.title,
            "bDescription" : this.state.description,
            "bStartDateTime": iVCommonUtils.mergeDateTime( this.state.startDate, this.state.startTime ),
            "bEndDateTime": iVCommonUtils.mergeDateTime( this.state.endDate, this.state.endTime )
        };
        
        /*console.log(data);
        console.log(iVConfigs);*/
        var tempObj = {
            baseURL: iVConfigs.common.baseUrl,
                timeout: iVConfigs.common.timeout,
            headers: iVConfigs.common.headers
        };
        var axiosInstance = axios.create( tempObj );
        /*console.log('asdfasdfasdfasdfasd');
        console.log( iVConfigs.seminar );*/
        axiosInstance.post( iVConfigs.seminar.createSeminarEndpoint ,data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


    };


    render(){
        return(
            <div className="seminar-create-page">
                <VrHeader />
                <div className="main-container">

                    <div className="seminar-create-container">
                        <TextField
                            hintText="Title"
                            errorText="Please provide title for seminar"
                            floatingLabelText="Title"
                            type="text"
                            onChange={this.handleTitleChange.bind(this)}
                            value={this.state.title}
                        /><br />
                        <TextField
                            hintText="Description"
                            errorText="Please provide description for seminar"
                            floatingLabelText="Description"
                            type="text"
                            onChange={this.handleDescriptionChange.bind(this)}
                            value={this.state.description}
                        /><br />
                        <TextField
                            hintText="Tags"
                            errorText="Please provide tags for seminar"
                            floatingLabelText="tags"
                            type="text"
                            onChange={this.handleTagsChange.bind(this)}
                            value={this.state.tags}
                        /><br />
                        <DatePicker onChange={this.handleStartDate.bind(this)} value ={this.state.startDate} hintText="Seminar start date" />
                        <TimePicker onChange={this.handleStartTime.bind(this)} value={this.state.startTime} hintText="Seminar start time" /><br />
                        <DatePicker onChange={this.handleEndDate.bind(this)} value ={this.state.endDate} hintText="Seminar end date" />
                        <TimePicker onChange={this.handleEndTime.bind(this)} value={this.state.endTime} hintText="Seminar end time" /><br />

                        <FlatButton className="landing-btn" label="Create Seminar" primary={true}
                                    backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleSubmit.bind(this)}
                                    target="_blank"/>
                    </div>
                </div>

            </div>
        )
    }

}

export default Seminar;