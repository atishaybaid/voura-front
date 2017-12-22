import React, { Component } from 'react';
import TagBox from './TagBox';
import TextField from 'material-ui/TextField';
import requests from './utils/requests';
import Utils from './utils/common.js';
import UserCard from './UserCard';
import FlatButton from 'material-ui/FlatButton';

class SearchPeople extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedTags : [],
            personName : '',
            resultPeople: []
        }
        this.getSelectedTags = this.getSelectedTags.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generatePeopleList = this.generatePeopleList.bind(this);
    }

    componentDidMount(){
/*
        var dummy = [ { "userId": 9, "fId": "sahvi06@gmail.com", "name": "sahvi05", "title": null, "desc": null, "image": "", "organisations": [], "colleges": [], "tags": [ "redis", "sah" ] } ];
        this.setState({ resultPeople: dummy } );
*/
    }

    getSelectedTags( tags ){
        this.setState({ selectedTags: tags });
    }

    nameChange( event, newValue ){
        this.setState({personName:newValue});
    }


    getDummyData(){
        var dummy = [ { "userId": 9, "fId": "sahvi06@gmail.com", "name": "sahvi05", "title": "9 title", "desc": "9  desc", "image": "/9.jpg", "organisations": ["nine-org"], "colleges": ["nine-college"], "tags": [ "redis", "sah" ] }, { "userId": 8, "fId": "sahvi08@gmail.com", "name": "sahvi08", "title": "8 title", "desc": "8  desc", "image": "/8.jpg", "organisations": ["8-org"], "colleges": ["8-college"], "tags": [ "redis", "8" ] } ];
        return dummy;
    }

    handleSubmit(){
        var that = this;
        var data = { name: this.state.personName, tags: this.state.selectedTags };
        requests.getPersonSearch( data ).then(function ( resolve ) {
            //that.setState({ resultPeople: resolve } );
            that.setState({ resultPeople: that.getDummyData() } );
        }, function ( reject ) {

        });
    }

    generatePeopleList(){
        var that = this;

        var peopleList = this.state.resultPeople.map( function( item, index ){
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
                    <div className="mt-md-2" >
                    <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                    <TextField
                        hintText="person name"
                        type="text"
                        onChange={this.nameChange}
                        value={this.state.personName}
                        fullWidth={true}
                    />
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-6">
                    <FlatButton className="search-btn" label="Search People" primary={true}
                                backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleSubmit}
                                target="_blank"/>
                            </div>
                        </div>
                </div>
                <div className="outBox">
                    {this.generatePeopleList()}
                </div>
            </div>
        );
    }

}

export default SearchPeople;