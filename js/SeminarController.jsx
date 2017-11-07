import React ,{ Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class SeminarController extends Component {
    constructor(props) {
        super();
        this.state = {
            message: 'your seminar control',
            buttonMsg: 'preview'
        }
    };

    handleSemControllerButtonClick(event,newValue){
        this.setState({startDate:newValue});
    };

    render() {
        return (
            <div className="sem-controller">
            <p>
                {this.state.message}
            </p>
            <FlatButton className="landing-btn" label={this.state.buttonMsg} primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleSemControllerButtonClick.bind(this)} target="_blank"/>
            </div>
        )
    }
}

export default SeminarController;