import React,{Component} from 'react';
import QuestionList from '../QuestionList.jsx';

class QuestionListPage extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="question-list-page">
                <QuestionList />
                </div>
        )
    }


}

export default QuestionListPage;