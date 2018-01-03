import React ,{ Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import requests from '../utils/requests';
import IconButton from 'material-ui/IconButton';
import CollegeIcon from 'material-ui/svg-icons/action/account-balance';
import EditIcon from 'material-ui/svg-icons/editor/border-color';
import Divider from 'material-ui/Divider';
import Utils from '../utils/common.js';

class ExperienceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expList: []
        }
        this.generateExpList = this.generateExpList.bind(this);
        this.editExpItem = this.editExpItem.bind(this);
        this.getRightIconButton = this.getRightIconButton.bind(this);
        this.getSecondryText = this.getSecondryText.bind(this);
        this.getPrimaryText = this.getPrimaryText.bind(this);
    }

    getSecondryText( item ){
        return item.company;
    }

    getPrimaryText( item ){
        return item.title;
    }

    editExpItem( item, event ){
        if( this.props.pickExpItemForEdit ){
            this.props.pickExpItemForEdit( item );
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ expList: nextProps.expList });
    }

    getRightIconButton( item ){
        if( this.props.readonly ) {
            return null
        }else{
            return <IconButton onClick={this.editExpItem.bind(this, item)}> <EditIcon /> </IconButton>
        }

    }

    generateExpList(){
        var that = this;
        var expList = '';
        if( Utils.isNonEmptyArray( this.state.expList ) ) {
            var expList = this.state.expList.map(function (item, index) {
                return <div key={`exp.item_${index}`}>
                    <ListItem
                        leftIcon={<CollegeIcon />}
                        rightIconButton={that.getRightIconButton(item)}
                        primaryText={that.getPrimaryText( item )}
                        secondaryText={that.getSecondryText( item )}
                        secondaryTextLines={2}
                    />
                    <Divider inset={true} />
                </div>
            })
        }
        return expList;
    }

    render(){
        return (
            <div className="exp-list">
                <List>
                    {this.generateExpList()}
                </List>
            </div>
        )
    }
}

export default ExperienceList;