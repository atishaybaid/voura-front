import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
import YoutubeEmbed from './YoutubeEmbed.jsx';
import SQuestionList from './SQuestionList.jsx';
import AskQuestBox from './AskQuestBox.jsx';

class SeminarS extends Component {
    constructor(props) {
        super();
        this.state = {
        }
    };

    render(){
        return (
            <div className="seminarP-page">
                <VrHeader />
                <div className="main-container">
                    <div className="seminar-left-coloumn">
                        <YoutubeEmbed/>
                        <AskQuestBox />
                    </div>
                    <div className="seminar-right-coloumn">
                        <SQuestionList/>
                    </div>
                </div>
            </div>
        )
    }

}

export default SeminarS;