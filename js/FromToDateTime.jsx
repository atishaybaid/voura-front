import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

// update in incoming callback
// this.props.updateDateTime
class FromToDateTime extends Component {
    constructor(props) {
        super();
        this.state = {
            startDate: new Date(),
            startTime: new Date(),
            endDate: new Date(),
            endTime: new Date()
        }
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleEndTime = this.handleEndTime.bind(this);
        this.updateParent = this.updateParent.bind(this);
        this.generateDateTimeBoxes = this.generateDateTimeBoxes.bind(this);
    }

    updateParent(){
        if( this.props.updateDateTime ){
            var obj = { startDate : this.state.startDate, startTime: this.state.startTime, endDate: this.state.endDate, endTime: this.state.endTime }
            this.props.updateDateTime( obj );
        }
    }
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

    generateDateTimeBoxes(){
        return (
            <div className="from-to-datetime">
                if( this.props.showStartDate ){
                    <DatePicker onChange={this.handleStartDate} value ={this.state.startDate} hintText="Start date" />
                }
                if( this.props.showStartTime  ){
                    <TimePicker onChange={this.handleStartTime} value={this.state.startTime} hintText="Start time" />
                }
                if( this.props.showEndDate ){
                    <DatePicker onChange={this.handleEndDate} value ={this.state.endDate} hintText="End date" />
                }
                if( this.props.showEndDate ){
                  <TimePicker onChange={this.handleEndTime} value={this.state.endTime} hintText="End time" />
                }
            </div>
        )
    }

    render(){
        return (
            <div className="from-to-datetime">
                { this.props.showStartDate ? ( <DatePicker onChange={this.handleStartDate} value ={this.state.startDate} hintText="Start date" /> ) : null }

                { this.props.showStartTime ? ( <TimePicker onChange={this.handleStartTime} value={this.state.startTime} hintText="Start time" /> ) : null }

                { this.props.showEndDate ? ( <DatePicker onChange={this.handleEndDate} value ={this.state.endDate} hintText="End date" /> ) : null }

                { this.props.showEndTime ? ( <TimePicker onChange={this.handleEndTime} value={this.state.endTime} hintText="End time" /> ) : null }

            </div>
        );
    }
}

export default FromToDateTime;