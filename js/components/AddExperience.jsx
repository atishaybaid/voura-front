import React ,{ Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Utils from '../utils/common.js';

// update in incoming callback
// this.props.updateExperienceItem
class AddExperience extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: '',
            title: '',
            company: '',
            location: '',
            fromDate: new Date(),
            toDate: new Date(),
            deleted: false
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleFromDate = this.handleFromDate.bind(this);
        this.handleToDate = this.handleToDate.bind(this);
        this.updateParent = this.updateParent.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.deleteExperience = this.deleteExperience.bind(this);

        var nextProps = props;
        if( Utils.isNonEmptyObject( nextProps.expItem ) ) {
            this.state = {
                title: nextProps.expItem.title,
                company: nextProps.expItem.company,
                location: nextProps.expItem.location,
                fromDate: nextProps.expItem.fromDate,
                toDate: nextProps.expItem.toDate,
                index: nextProps.expItem.index,
                deleted: false
            };
        }

    }


    updateParent(){
        if( this.props.updateExperienceItem ){
            var obj = this.state;
            this.props.updateExperienceItem( obj );
        }
    }

    addExperience(){
        this.updateParent();
    }

    handleFromDate(event,newValue){
        this.setState({fromDate:newValue});
    }

    handleToDate(event,newValue){
        this.setState({toDate:newValue});
    }

    handleTitleChange(event,newValue){
        this.setState({title:newValue});
    }

    handleCompanyChange(event,newValue){
        this.setState({company:newValue});
    }

    handleLocationChange(event,newValue){
        this.setState({location:newValue});
    }

    deleteExperience(){
        this.setState({deleted: true}, this.updateParent );
    }


    componentWillMount(){
        console.log( this.state );
    }

    //below is not getting fired by dialog box
    componentWillReceiveProps(nextProps) {
    }

    render(){
        return(
            <div className="add-exp">
                <div className="row">
                    <div className="col-md-10">
                        <TextField
                            hintText="title"
                            type="text"
                            onChange={this.handleTitleChange}
                            value={this.state.title}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <TextField
                            hintText="company"
                            type="text"
                            onChange={this.handleCompanyChange}
                            value={this.state.company}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <TextField
                            hintText="location"
                            type="text"
                            onChange={this.handleLocationChange}
                            value={this.state.location}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <span>From Date</span>
                    </div>
                    <div className="col-md-4">
                        <DatePicker hintText="From Date" onChange={this.handleFromDate} value ={this.state.fromDate} openToYearSelection={true} />
                    </div>
                    <div className="col-md-2">
                        <span>To Date</span>
                    </div>
                    <div className="col-md-4">
                        <DatePicker hintText="To Date" onChange={this.handleToDate} value ={this.state.toDate}  openToYearSelection={true} />
                    </div>
                </div>
                <div className="row">
                    <FlatButton
                        label="Delete"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.deleteExperience}
                    />
                    <FlatButton
                        label="Update"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.addExperience}
                    />
                </div>
            </div>
        );
    }

}

export default AddExperience;