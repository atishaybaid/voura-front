import React ,{ Component } from 'react';
import TextField from 'material-ui/TextField';

class AskQuestBox extends Component {
    constructor(props) {
        super();
        this.state = {
            question : ""
        }
    };

    handleQuestionAdd(event,newValue){
        this.setState({question:newValue});
    };

    render(){
        return (
            <div className="ask-box">
                <TextField
                    hintText="Ask any question"
                    floatingLabelText="Question"
                    type="text"
                    onChange={this.handleQuestionAdd.bind(this)}
                    value={this.state.question}
                />
            </div>
        )
    }

}

export default AskQuestBox;