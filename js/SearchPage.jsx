import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import SearchPeople from './SearchPeople'
import SearchSeminars from './SearchSeminars';
import SearchVideos from './SearchVideos';

class SearchPage extends Component {
    constructor(props) {
        super();
        this.state = {}
    }

    render(){
        return (
            <div className="container">
            <Tabs>
                <Tab label="Search Professionals" >
                    <SearchPeople />
                </Tab>
                <Tab label="Search Seminars">
                    <SearchSeminars />
                </Tab>
                <Tab label="Search Videos">
                    <SearchVideos showSearchInputForm={true}/>
                </Tab>
            </Tabs>
                </div>
        );
    }

}

export default SearchPage;