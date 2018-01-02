import React, { Component } from 'react';
import FromToDateTime from './FromToDateTime';
import TextField from 'material-ui/TextField';
import requests from './utils/requests';
import Utils from './utils/common.js';
import FlatButton from 'material-ui/FlatButton';
import TagBox from './TagBox';
import UserCard from './UserCard';
import DDP from './utils/DummyDataProvider';

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
        this.getUsersData = this.getUsersData.bind(this);
        this.updateSemData = this.updateSemData.bind(this);
        this.insertActualUserDataIntoSeminars = this.insertActualUserDataIntoSeminars.bind(this);
    }

    componentDidMount(){

        /*
        var dummy =  [ { "tags": [ "mongodb", "redis" ], "videoIds": [], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511698969634, "upvote": 0, "downvote": 0, "id": "r1fQMNßgf" }, { "tags": [ "mongodb", "redis" ], "videoIds": [ "ryGv1fJlG" ], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511877211440, "upvote": 5, "downvote": 1, "id": "HkQP9yjgM" }, { "tags": [ "mongodb", "redis" ], "videoIds": [ "ryGv1fJlG" ], "question": "xyz", "user": "4", "answered": false, "time": "-1", "createdAt": 1511699100603, "upvote": 0, "downvote": 0, "id": "BJriGEOef" } ];

        this.setState({ resultSeminars: dummy } );
*/
    }

    getSelectedTags( tags ){
        this.setState({ selectedTags: tags });
    }

    getSelectedDateTime( dateTimeObj ){
        this.setState({ startDateTime: this.props.startDate, endDateTime: this.props.endDate });
    }

    getDummyData(){
        var dummy =   [ { "videoId": "B1lhRkXiez", "mType": "SEMINAR", "mReq": "MODERATE", "from": 1511973023210, "to": 1511978294863, "title":"sem1 title", "description": "u2semdesc", "tags": [ "mongodb", "redis" ], "aTags": [], "requestor": 0, "requestee": 1, "state": "FINISHED", "createdAt": 1511891854150, "updatedAt": 1511891854150, "id": "B1lhRkXiez" }, { "videoId": "rJeIc7mixf", "mType": "SEMINAR", "mReq": "MODERATE", "from": 1511973023210, "to": 1511978294863, "title":"sem2 title", "description": "u2semdesc", "tags": [ "mongodb", "redis" ], "aTags": [], "requestor": 0, "requestee": 2, "state": "FINISHED", "createdAt": 1511891854150, "updatedAt": 1511891854150, "id": "HyUqXQoeM" } ];
        return dummy;
    }

    getUserIds( semData ){
        var res =[];
        semData.forEach( function ( item, index ) {
            if( !Utils.isEmpty( item.requestee ) )
                res.push( item.requestee );
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
                item.userInfo = that.getUserFromArr(userArr, item.requestee)
            })
        }
        return semArr;
    }

    getDummyUsers(){
        var dummyUsers =  [ { "_id": "5a19345f685d5d7adab91bde", "userId": 1, "fId": "sahvi05@gmail.com", "name": "one", "title": "one title", "desc": "one desc", "image": "/oneimg", "organisations": ["one-inc"], "colleges": ["one-college"] }, { "_id": "5a118633c7f1f77a22fd1028", "userId": 2, "fId": "two@two.com", "name": "two", "title": "two title", "desc": "two desc", "image": "/twoimg", "organisations": ["two-org"], "colleges": ["two-uni"] } ];
        return dummyUsers;
    }

    getUsersData( userIdsArr ){
        var that = this;
        //var userIds = userIdsArr.join(',');
        var userIds = Array.prototype.join.call( userIdsArr, ',');
        requests.getUsersInfo( userIds ).then( function ( resolve ) {
            var sems  = that.state.resultSeminars;
            sems = that.updateSemData( sems, that.getDummyUsers() );
            //sems = that.updateSemData( sems, resolve );
            that.setState({ resultSeminars: sems } );
        }, function ( reject ) {

        });
    }

    insertActualUserDataIntoSeminars( semData ){
        var userIdsArr = this.getUserIds( semData );
        this.getUsersData( userIdsArr );
    }

    getSubtitle( item ){
        var subt = '';
        if( Utils.isNonEmptyObject(item) ){
            subt = item.from + '-' + item.to;
        }
        return subt;
    }

    attachUserInfoToSems( sems ){
        var userInfo = { name: '', title: '',  avatar: '', profileUrl: '/#'};
        sems.forEach( function ( item, index ) {
            item.userInfo = userInfo;
        })
        return sems;
    }

    handleSubmit(){
        var that = this;
        var data = { tags: this.state.selectedTags, from: this.state.startDateTime, to: this.state.endDateTime };
        requests.getSeminarSearch( data ).then(function ( resolve ) {
            //that.setState({ resultSeminars: resolve } );
            that.setState({ resultSeminars: DDP.getSearchedSeminarResults() } );
            var sems = that.state.resultSeminars;
            var sems = that.attachUserInfoToSems( sems );
            //that.setState({ resultSeminars: sems } );
            that.insertActualUserDataIntoSeminars( sems );
        }, function ( reject ) {

        });
    }

    generateSeminarList(){
        var that = this;

        var semList = this.state.resultSeminars.map( function( item, index ){

            var userInfo = {};
            if( !Utils.isEmpty( item.userInfo ) ){
                userInfo = {
                    name: item.userInfo.name,
                    title: item.userInfo.title,
                    avatar: item.userInfo.image,
                    profileUrl: Utils.getProfileUrlFromId(item.userInfo.userId)
                };
            }
            var videoData = { title: item.title, subtitle: that.getSubtitle( item ), videoUrl: Utils.getSeminarForSUrl( item.videoId ), description: item.description };
            return ( <div key ={`people_${index}`}>
                {Utils.isNonEmptyObject(userInfo) && Utils.isNonEmptyObject(videoData) ? ( <UserCard userInfo={userInfo} videoData={videoData} /> ): "" }
                <hr className="hr-primary" />
            </div> )
        } )

        return semList;
    }


    render(){
        return (
            <div className="">
                <div className="inputBox">
                    <div className="mt-md-2" >
                    <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/>
                        </div>
                    <div className="row">
                        <div className="col-md-10">
                    <FromToDateTime showStartDate="true" showEndDate="true" updateDateTime={(q)=>this.getSelectedDateTime(q)} />
                        </div>
                     </div>
                    <div className="row">
                        <div className="col-md-6">
                    <FlatButton className="search-btn" label="Search Seminars" primary={true}
                                backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleSubmit}
                                target="_blank"/>
                            </div>
                        </div>

                 </div>
                <div className="outBox">
                    {this.generateSeminarList()}
                </div>
                </div>
        );
    }

}

export default SearchSeminars;