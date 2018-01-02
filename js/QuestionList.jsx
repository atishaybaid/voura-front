import React ,{ Component } from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import requests from './utils/requests';
import Utils from './utils/common.js';
import TagBox from './TagBox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Pagination from 'material-ui-pagination'
import Snackbar from 'material-ui/Snackbar';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
};

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.defaultSortBySelected = 'date';
        this.state = {
            selectedTag:[],
            questionList: [],
            sortBy: this.defaultSortBySelected,
            limitPerPage: 10,
            total: 1,
            display: 5,
            number: 1, // page number

            snackBarAutoHideDuration: 2000,
            snackBarMessage: '',
            snackBarOpen: false,

        }
        this.handleTagSelected = this.handleTagSelected.bind(this);
        this.addToSeminar = this.addToSeminar.bind(this);
        this.search = this.search.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.addQuestionAfterListClick = this.addQuestionAfterListClick.bind(this);
        this.generateQuesList = this.generateQuesList.bind(this);
        this.addToSeminar = this.addToSeminar.bind(this);
        this.getSelectedTags = this.getSelectedTags.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.getPagination = this.getPagination.bind(this);
        this.getAddToSeminarButton = this.getAddToSeminarButton.bind(this);
    };

    handleRequestClose(){
        this.setState({
            snackBarOpen: false,
            snackBarMessage: ''
        });
    };

    handleTagSelected(chosenTag){
        //@todo hit api to fetch questions with this tag and set state of question list
        var that = this;

        var data = { searchedTag: chosenTag, page: this.state.number, limitPerPage: this.state.limitPerPage };
        switch( this.state.sortBy ){
            case  'date':
                data.all = true;
            case  'unanswered':
                data.answered=false;
            case  'asked_by_me':
                data.askedByMe=true;
            default:
                data.all = true;
        }

        requests.searchQuestionsByTag( data ).then( function ( resolve ) {
            if( Utils.isEmpty( resolve ) ){
                that.setState( {snackBarMessage : 'No questions found for your tags. Please try changing tags', questionList: resolve.questions, snackBarOpen: true});
            } else {
                var total = ( parseInt( resolve.totalQuestions )/ that.state.limitPerPage) + 1;
                that.setState({ questionList: resolve.questions, total: total });
            }
        }, function ( reject ) {
            console.log( reject );
        });

    }

    addQuestion( index, event, checked ){
        let qList = this.state.questionList;
        qList[index].selected = checked;
        this.setState({questionList:qList});
    }

    addQuestionAfterListClick( index, event ){
        let qList = this.state.questionList;
        var newState = !qList[index].selected;
        qList[index].selected = newState;
        this.setState({questionList:qList});
    }

    generateQuesList(){
        //console.log( this.state.questionList );
        var that = this;
        var quesList = '';
        if( Utils.isNonEmptyArray( this.state.questionList ) ) {
            var quesList = this.state.questionList.map(function (item, index) {

                if( that.props.pickQuestion ){
                    return (
                        <div key={`selectedQuest.quest_${index}`}>
                        <ListItem primaryText={item.question} onClick={that.addQuestionAfterListClick.bind(that, index)} leftCheckbox={<Checkbox checked={ item.selected }
                        onCheck={that.addQuestion.bind(that, index)}
                        style={{marginBottom: 16}} />} />
                        <hr className="hr-primary"/>
                    </div>
                    )
                } else {
                    return (
                        <div key={`selectedQuest.quest_${index}`}>
                            <ListItem primaryText={item.question} />
                            <hr className="hr-primary"/>
                        </div>
                    )
                }


            })
        }
        //console.log( quesList );
        return quesList;
    }

    addToSeminar(){
        //var qIds = this.getSelectedQuestions( this.state.questionList );
        var quests = Utils.getSelectedQuestions( this.state.questionList );
        if( this.props.pickQuestion ){
            this.props.pickQuestion( quests );
        }
    }

    search(){
        //spoof tag is selected
        var chosenTags = Utils.getStringFromArr( this.state.selectedTag );
        this.handleTagSelected( chosenTags );
    }

    getSelectedTags( tags ){
        this.setState({ selectedTag: tags });
    }

    handleSortByChange( value ){
        this.setState({ sortBy: value });
    }

    getPagination(){
        if( Utils.isNonEmptyArray( this.state.questionList ) ){
            return (
                <Pagination
                    total = { this.state.total }
                    current = { this.state.number }
                    display = { this.state.display }
                    onChange = { number => this.setState({ number }) }
                />
            );
        } else {
            return null;
        }

    }

    getAddToSeminarButton(){
        if( this.props.pickQuestion ) {
            return (
                <FlatButton className="control-btn" label='Add to seminar' primary={true} backgroundColor={'#4ebcd5'}
                            style={{color:'#ffffff'}} onClick={this.addToSeminar} target="_blank"/>
            )
        } else {
            return (null);
        }
    }

    render(){
        return (
            <div className="questionList-component">
                <div className="input-area">
                <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/>
                    <span>Sort Quesitons by:</span>
                <RadioButtonGroup name="sort" defaultSelected={this.defaultSortBySelected} onChange={this.handleSortByChange}>
                    <RadioButton
                        value="date"
                        label="Date"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="unanswered"
                        label="Unanswered"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="asked_by_me"
                        label="Asked by me"
                        style={styles.radioButton}
                    />
                    </RadioButtonGroup>
                <FlatButton className="control-btn" label='Search' primary={true} backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.search} target="_blank"/>
                    </div>
                <div className="Question-list">
                    <List>
                        { this.props.pickQuestion ? <Subheader>Select questions below to add to seminar</Subheader> : null }
                        {this.generateQuesList()}
                    </List>
                </div><br/>
                {this.getPagination()}
                {this.getAddToSeminarButton()}
                { this.props.showSnackBar ?
                    <Snackbar
                        open={this.state.snackBarOpen}
                        message={this.state.snackBarMessage}
                        autoHideDuration={this.state.snackBarAutoHideDuration}
                        onRequestClose={this.handleRequestClose}
                    />
                : null}
            </div>
        )
    }
}

export  default QuestionList;