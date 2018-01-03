import React ,{ Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import requests from '../utils/requests';
import IconButton from 'material-ui/IconButton';
import CollegeIcon from 'material-ui/svg-icons/action/account-balance';
import EditIcon from 'material-ui/svg-icons/editor/border-color';
import Divider from 'material-ui/Divider';
import Utils from '../utils/common.js';

class EducationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eduList: []
        }
        this.generateEduList = this.generateEduList.bind(this);
        this.editEduItem = this.editEduItem.bind(this);
        this.getRightIconButton = this.getRightIconButton.bind(this);
        this.getSecondryText = this.getSecondryText.bind(this);
        this.getPrimaryText = this.getPrimaryText.bind(this);
    }

    getSecondryText( item ){
        return item.degree + ', ' + item.fieldOfStudy;
    }

    getPrimaryText( item ){
        return item.school;
    }

    editEduItem( item, event ){
        if( this.props.pickEduItemForEdit ){
            this.props.pickEduItemForEdit( item );
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ eduList: nextProps.eduList });
    }

    getRightIconButton( item ){
        if( this.props.readonly ) {
            return null
        }else{
            return <IconButton onClick={this.editEduItem.bind(this, item)}> <EditIcon /> </IconButton>
        }

    }

    generateEduList(){
        var that = this;
        var eduList = '';
        if( Utils.isNonEmptyArray( this.state.eduList ) ) {
            var eduList = this.state.eduList.map(function (item, index) {
                return <div key={`edu.item_${index}`}>
                    <ListItem
                        leftIcon={<CollegeIcon />}
                        rightIconButton={ that.getRightIconButton(item) }
                        primaryText={that.getPrimaryText( item )}
                        secondaryText={that.getSecondryText( item )}
                        secondaryTextLines={2}
                    />
                    <Divider inset={true} />
                </div>
            })
        }
        //console.log( quesList );
        return eduList;
    }

    render(){
        return (
            <div className="edu-list">
                <List>
                    {this.generateEduList()}
                </List>
            </div>
        )
    }
}

export default EducationList;