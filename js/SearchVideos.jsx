import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import requests from './utils/requests';
import Utils from './utils/common.js';
import FlatButton from 'material-ui/FlatButton';
import TagBox from './TagBox';
import UserCard from './UserCard';

class SearchVideos extends Component {
    constructor(props) {
        super( props );
        this.state = {
            selectedTags : this.props.selectedTags ? this.props.selectedTags : [],
            question : this.props.question ? this.props.question : '',
            resultVideos: []
        }
        this.getSelectedTags = this.getSelectedTags.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateVideosList = this.generateVideosList.bind(this);
        this.questionChange = this.questionChange.bind(this);
        this.generateInputFields = this.generateInputFields.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ question: nextProps.question, selectedTags: nextProps.selectedTags });
    }


    componentDidMount(){
/*
        var dummy = [ { "tags": [ "mongodb", "redis" ], "videoIds": [], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511698969634, "upvote": 0, "downvote": 0, "id": "r1fQMNßgf" }, { "tags": [ "mongodb", "redis" ], "videoIds": [ "ryGv1fJlG" ], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511877211440, "upvote": 5, "downvote": 1, "id": "HkQP9yjgM" }, { "tags": [ "mongodb", "redis" ], "videoIds": [ "ryGv1fJlG" ], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511699100603, "upvote": 0, "downvote": 0, "id": "BJriGEOef" } ];

        this.setState({ resultVideos: dummy } );
*//*
        if( !Utils.isEmpty( this.props.question ) || Utils.isNonEmptyArray( this.props.selectedTags ) ){
            this.setState( { question: this.props.question, selectedTags: this.props.selectedTags } );
            this.handleSubmit();
        }*/

        if( !this.props.showSearchInputForm )
            this.props.onRef(this)
    }

    componentWillUnmount() {
        if( !this.props.showSearchInputForm )
            this.props.onRef(undefined)
    }

    getSelectedTags( tags ){
        this.setState({ selectedTags: tags });
    }

    questionChange( event, newValue ){
        this.setState({question:newValue});
    }

    getDummyVideoData(){
        var dummy = [ { "tags": [ "mongodb", "redis" ], "videoIds": [], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511698969634, "upvote": 0, "downvote": 0, "id": "r1fQMNßgf" }, { "tags": [ "mongodb", "redis" ], "videoIds": [ "ryGv1fJlG" ], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511877211440, "upvote": 5, "downvote": 1, "id": "HkQP9yjgM" }, { "tags": [ "mongodb", "redis" ], "videoIds": [ "ryGv1fJlG" ], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511699100603, "upvote": 0, "downvote": 0, "id": "BJriGEOef" } ];
        return dummy;
    }

    getUserIds( semData ){
        var res =[];
        semData.forEach( function ( item, index ) {
            if( !Utils.isEmpty( item.user ) )
                res.push( item.user );
        })
        return res;
    }

    getUserFromArr( userArr, userId ){
        var user ={};
        userArr.forEach( function ( item ) {
            if( item.userId == userId ){
                return item;
            }
        })
        return user;
    }

    updateSemData( semArr, userArr ){
        var that = this;
        if( Utils.isNonEmptyArray(semArr) && Utils.isNonEmptyArray( userArr ) ) {
            semArr.forEach(function (item) {
                item.userInfo = that.getUserFromArr(userArr, item.user)
            })
        }
        return semArr;
    }

    getDummyUsers(){
        var dummyUsers =  [ { "_id": "5a19345f685d5d7adab91bde", "userId": 1, "fId": "sahvi05@gmail.com", "name": "one", "title": "one title", "desc": "one desc", "image": "/oneimg", "organisations": ["one-inc"], "colleges": ["one-college"] }, { "_id": "5a118633c7f1f77a22fd1028", "userId": 2, "fId": "two@two.com", "name": "two", "title": "two title", "desc": "two desc", "image": "/twoimg", "organisations": ["two-org"], "colleges": ["two-uni"] } ];
        return dummyUsers;
    }

    attachUserInfoToVids( sems ){
        var userInfo = { name: '', title: '',  avatar: '', profileUrl: '/#'};
        sems.forEach( function ( item, index ) {
            item.userInfo = userInfo;
        })
        return sems;
    }

    getUsersData( userIdsArr ){
        var that = this;
        //var userIds = userIdsArr.join(',');
        var userIds = Array.prototype.join.call( userIdsArr, ',');
        requests.getUsersInfo( userIds ).then( function ( resolve ) {
            var sems  = that.state.resultVideos;
            sems = that.updateSemData( sems, that.getDummyUsers() );
            //sems = that.updateSemData( sems, resolve );
            that.setState({ resultVideos: sems } );
        }, function ( reject ) {

        });
    }

    insertActualUserDataIntoVideos( semData ){
        var userIdsArr = this.getUserIds( semData );
        this.getUsersData( userIdsArr );
    }

    getSubtitle( item ){
        var subt = 'dummy subtitle';
        return subt;
    }

    handleSubmit(){
        var that = this;
        var data = { name: this.state.question, tags: this.state.selectedTags };
        requests.getVideoSearch( data ).then(function ( resolve ) {
            //that.setState({ resultVideos: resolve } );
            that.setState({ resultVideos: that.getDummyVideoData() } );
            var vids = that.state.resultVideos;
            var vids = that.attachUserInfoToVids( vids );
            //that.setState({ resultSeminars: vids } );
            that.insertActualUserDataIntoVideos( vids );
        }, function ( reject ) {

        });
    }

    generateVideosList(){
        var that = this;

        var vidList = this.state.resultVideos.map( function( item, index ){

            var userInfo = {};
            if( !Utils.isEmpty( item.userInfo ) ){
                userInfo = {
                    name: item.userInfo.name,
                    title: item.userInfo.title,
                    avatar: item.userInfo.image,
                    profileUrl: Utils.getProfileUrlFromId(item.userInfo.userId)
                };
            }

            var videoData = { title: item.title, subtitle: that.getSubtitle(), videoUrl: Utils.getVideoUrl( item.videoId ), description: item.desc };

            return ( <div key ={`people_${index}`}>
                {Utils.isNonEmptyObject(userInfo) && Utils.isNonEmptyObject(videoData) ? ( <UserCard userInfo={userInfo} videoData={videoData} /> ): "" }
                <hr className="hr-primary" />
            </div> )
        } )
        //console.log( quesList );
        return vidList;
    }

    generateInputFields(){
        if( !Utils.isEmpty(this.props.showSearchInputForm ) ) {
            return (
                <div className="inputBox">
                    <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/>
                    <TextField
                        hintText="question"
                        errorText="Please provide question"
                        floatingLabelText="Search by question"
                        type="text"
                        onChange={this.questionChange}
                        value={this.state.question}
                    /><br />
                    <FlatButton className="search-btn" label="Search videos" primary={true}
                                backgroundColor={'#4ebcd5'} style={{color:'#ffffff'}} onClick={this.handleSubmit}
                                target="_blank"/>

                </div>
            );
        }else {
            return (null);
        }
    }

    render(){

        return (
            <div className="">
                {this.generateInputFields()}
                <div className="outBox">
                    {this.generateVideosList()}
                </div>
            </div>
        );
    }

}

export default SearchVideos;