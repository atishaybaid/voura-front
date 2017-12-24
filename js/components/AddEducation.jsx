import React ,{ Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Utils from '../utils/common.js';

// update in incoming callback
// this.props.updateEducationItem
class AddEducation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: '',
            school: '',
            degree: '',
            fieldOfStudy: '',
            grade :'',
            fromDate: new Date(),
            toDate: new Date()
        };
        this.handleSchoolChange = this.handleSchoolChange.bind(this);
        this.handleDegreeChange = this.handleDegreeChange.bind(this);
        this.handleFieldOfStudyChange = this.handleFieldOfStudyChange.bind(this);
        this.handleGradeChange = this.handleGradeChange.bind(this);
        this.handleFromDate = this.handleFromDate.bind(this);
        this.handleToDate = this.handleToDate.bind(this);
        this.updateParent = this.updateParent.bind(this);
        this.addEducation = this.addEducation.bind(this);

        var nextProps = props;
        if( Utils.isNonEmptyObject( nextProps.eduItem ) ) {
            this.state = {
                school: nextProps.eduItem.school,
                degree: nextProps.eduItem.degree,
                fieldOfStudy: nextProps.eduItem.fieldOfStudy,
                grade: nextProps.eduItem.grade,
                fromDate: nextProps.eduItem.fromDate,
                toDate: nextProps.eduItem.toDate,
                index: nextProps.eduItem.index
            };
        }

    }


    updateParent(){
        if( this.props.updateEducationItem ){
            var obj = this.state;
            this.props.updateEducationItem( obj );
        }
    }

    addEducation(){
        this.updateParent();
    }

    handleFromDate(event,newValue){
        this.setState({fromDate:newValue});
    }

    handleToDate(event,newValue){
        this.setState({toDate:newValue});
    }

    handleSchoolChange(event,newValue){
        this.setState({school:newValue});
    }

    handleDegreeChange(event,newValue){
        this.setState({degree:newValue});
    }

    handleFieldOfStudyChange(event,newValue){
        this.setState({fieldOfStudy:newValue});
    }

    handleGradeChange(event,newValue){
        this.setState({grade:newValue});
    }


    componentWillMount(){
        console.log( this.state );
    }

    componentWillReceiveProps(nextProps) {

        if( Utils.isNonEmptyObject( nextProps.eduItem ) ) {
            this.setState({
                school: nextProps.eduItem.school,
                degree: nextProps.eduItem.degree,
                fieldOfStudy: nextProps.eduItem.fieldOfStudy,
                grade: nextProps.eduItem.grade,
                fromDate: nextProps.eduItem.fromDate,
                toDate: nextProps.eduItem.toDate,
                index: nextProps.eduItem.index
            });
        }
    }

    render(){
        return(
            <div className="add-edu">
                <div className="row">
                    <div className="col-md-10">
                        <TextField
                            hintText="school"
                            type="text"
                            onChange={this.handleSchoolChange}
                            value={this.state.school}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <TextField
                            hintText="Degree"
                            type="text"
                            onChange={this.handleDegreeChange}
                            value={this.state.degree}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <TextField
                            hintText="Field of study"
                            type="text"
                            onChange={this.handleFieldOfStudyChange}
                            value={this.state.fieldOfStudy}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <TextField
                            hintText="Grade( 1-10 )"
                            type="text"
                            onChange={this.handleGradeChange}
                            value={this.state.grade}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <span>From Date</span>
                    </div>
                    <div className="col-md-4">
                        <DatePicker hintText="From Date" onChange={this.handleStartDate} value ={this.state.fromDate} openToYearSelection={true} />
                    </div>
                    <div className="col-md-2">
                        <span>To Date</span>
                    </div>
                    <div className="col-md-4">
                        <DatePicker hintText="To Date" onChange={this.handleEndDate} value ={this.state.toDate}  openToYearSelection={true} />
                    </div>
                </div>
                <div className="row">
                    <FlatButton
                        label="Update"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.addEducation}
                    />
                </div>
            </div>
        );
    }

}

export default AddEducation;