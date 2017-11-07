import React ,{ Component } from 'react';
import VrHeader from './VrHeader.jsx';
import SeminarController from './SeminarController.jsx';
import YoutubeEmbed from './YoutubeEmbed.jsx';
import PQuestionList from './PQuestionList.jsx';

class SeminarP extends Component {
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
                        <SeminarController />
                        <YoutubeEmbed/>
                    </div>
                    <div className="seminar-right-coloumn">
                        <PQuestionList/>
                    </div>
                </div>
            </div>
        )
    }

}

export default SeminarP;