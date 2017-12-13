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

    componentWillMount(){

        var dummy = [ { "userId": 9, "fId": "sahvi06@gmail.com", "name": "sahvi05", "title": null, "desc": null, "image": "", "organisations": [], "colleges": [], "tags": [ "redis", "sah" ] } ];
        this.setState({ resultPeople: dummy } );

    }

    getSelectedTags( tags ){
        this.setState({ selectedTags: tags });
    }

    nameChange( event, newValue ){
        this.setState({personName:newValue});
    }

    handleSubmit(){
        var data = { name: this.state.personName, tags: this.state.selectedTags };
        requests.getPersonSearch( data ).then(function ( resolve ) {
            that.setState({ resultPeople: resolve } );
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
                    <TagBox getSelectedTags={(q)=>this.getSelectedTags(q)}/>
                    {this.state.selectedTags}
                    <TextField
                        hintText="person name"
                        errorText="Please provide person's name"
                        floatingLabelText="Search by person name"
                        type="text"
                        onChange={this.nameChange}
                        value={this.state.personName}
                    /><br />
                    <FlatButton className="search-btn" label="Search People" primary={true}
                                backgroundColor={'#4ebcd5'}  style={{color:'#ffffff'}} onClick={this.handleSubmit}
                                target="_blank"/>
                </div>
                <div className="outBox">
                    {this.generatePeopleList()}
                </div>
            </div>
        );
    }

}

export default SearchPeople;