import React ,{ Component } from 'react';
import Webcam from 'react-webcam';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

class WebCamCapture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
    }

    handleExpandChange(expanded){
        this.setState({expanded: expanded});
    };

    handleToggle(event, toggle){
        this.setState({expanded: toggle});
    };

    render() {
        return (<div>
            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardText>
                    <Toggle
                        toggled={this.state.expanded}
                        onToggle={this.handleToggle}
                        labelPosition="right"
                        label="Start/stop webcam by toggling this button"
                    />
                </CardText>
                <CardText expandable={true}>
                    <Webcam
                        audio={false}
                        height={this.props.height}
                        width={this.props.width}
                    />
                </CardText>
            </Card>
        </div>);
    }
}

export default WebCamCapture;