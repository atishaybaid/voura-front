import React, { Component } from 'react';
import FromToDateTime from './FromToDateTime';
import TextField from 'material-ui/TextField';
import requests from './utils/requests';
import Utils from './utils/common.js';
import FlatButton from 'material-ui/FlatButton';

class SearchSeminars extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedTags : [],
            startDateTime: new Date(),
            endDateTime: new Date(),
            resultSeminars: []
        }
        this.getSelectedTags = this.getSelectedTags.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateSeminarList = this.generateSeminarList.bind(this);
    }

    componentWillMount(){

        var dummy =  [ { "tags": [ "mongodb", "redis" ], "videoIds": [], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511698969634, "upvote": 0, "downvote": 0, "id": "r1fQMNßgf" }, { "tags": [ "mongodb", "redis" ], "videoIds": [ "ryGv1fJlG" ], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511877211440, "upvote": 5, "downvote": 1, "id": "HkQP9yjgM" }, { "tags": [ "mongodb", "redis" ], "videoIds": [ "ryGv1fJlG" ], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511699100603, "upvote": 0, "downvote": 0, "id": "BJriGEOef" } ];

        this.setState({ resultSeminars: dummy } );

    }

    getSelectedTags( tags ){
        this.setState({ selectedTags: tags });
    }

    getSelectedDateTime( dateTimeArr ){

    }

    handleSubmit(){
        var data = { tags: this.state.selectedTags };
        requests.getPersonSearch( data ).then(function ( resolve ) {
            that.setState({ resultPeople: resolve } );
        }, function ( reject ) {

        });
    }

    generateSeminarList(){
        var that = this;

        var peopleList = this.state.resultSeminars.map( function( item, index ){
            var userInfo = { name : item.name, title : item.title, avatar: item.image, profileUrl : Utils.getProfileUrlFromId(item.userId) };
            return ( <div key ={`people_${index}`}>
                {Utils.isNonEmptyObject(userInfo) ? ( <UserCard userInfo={userInfo}/> ): "" }
                <hr className="hr-primary" />
            </div> )
        } )
        //console.log( quesList );
        return peopleList;
    }


    render(){
        return (
            <div className="">
                <div className="inputBox">
                    <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/>
                    <FromToDateTime showStartDate="true" showEndDate="true" getDateTimes={(q)=>this.getSelectedDateTime(q)} />
                    <FlatButton className="search-btn" label="Search People" primary={true}
                                backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleSubmit}
                                target="_blank"/>

                 </div>
                <div className="outBox">
                    {this.generateSeminarList()}
                </div>
                </div>
        );
    }

}

export default SearchSeminars;