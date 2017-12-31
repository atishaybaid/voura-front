import React,{Component} from 'react';
import requests from '../utils/requests';
import Utils from '../utils/common.js';
import IconButton from 'material-ui/IconButton';
import {GridList, GridTile} from 'material-ui/GridList';
import DDP from '../utils/DummyDataProvider';
import PropTypes from 'prop-types';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};


class Homepage extends Component {

    constructor(props) {
        super(props);
        this.maxVideoToBeShown = 10;
        this.maxSemToBeShown = 10;
        this.state = {
            recommendations : {},
            recSeminars : [],
            recVideos : [],
            recPeople : [],
            pendingSeminars : []
        }
        this.getRecVideos = this.getRecVideos.bind(this);
        this.getRecSeminars = this.getRecSeminars.bind(this);
        this.generatePendingSemsGrid = this.generatePendingSemsGrid.bind(this);
        this.generateRecSemsGrid = this.generateRecSemsGrid.bind(this);
        this.generateRecVidsGrid = this.generateRecVidsGrid.bind(this);
        this.videoTileClicked = this.videoTileClicked.bind(this);
        this.recSemTileClicked = this.recSemTileClicked.bind(this);
        this.pendingSemTileClicked = this.pendingSemTileClicked.bind(this);
    }

    getRecVideos( recs ){
        var tags = recs.tags, tagCnt = 0;
        var vids = [], vidCnt = 0, tagIndex = {};//store index of indiviaual tag array;
        //@todo bad, get videos from server itself
        for( vidCnt = 0; vidCnt < this.maxVideoToBeShown; vidCnt++ ){
            for( tagCnt = 0; tagCnt < tags.length; tagCnt++ ){
                var index = tagIndex[tagCnt] ? tagIndex[tagCnt] : 0;
                var temp = recs.videos[ tags[tagCnt] ];
                if( !Utils.isEmpty( temp) && !Utils.isEmpty( temp[index] ) ){
                    //@todo handle case if all are empty, put vidCnt++ here only
                    vids.push( temp[index] );
                }
                tagIndex[tagCnt] = index + 1;
            }
        }
        return vids;
    }

// useful if rec seminars come in rec videos format
    getRecSeminars( recs ){
        var tags = recs.tags, tagCnt = 0;
        var vids = [], vidCnt = 0, tagIndex = {};
        //@todo bad, get videos from server itself
        for( vidCnt = 0; vidCnt < this.maxSemToBeShown; vidCnt++ ){
            for( tagCnt = 0; tagCnt < tags.length; tagCnt++ ){
                var index = tagIndex[tagCnt] ? tagIndex[tagCnt] : 0;
                var temp = recs.seminars[ tags[tagCnt] ];
                if( !Utils.isEmpty( temp) && !Utils.isEmpty( temp[index] ) ){
                    //@todo handle case if all are empty, put vidCnt++ here only
                    vids.push( temp[index] );
                }
                tagIndex[tagCnt] = index + 1;
            }
        }
        return vids;
    }

    recSemTileClicked( vidId ){
        var url = Utils.getSeminarForSUrl( vidId );
        this.context.router.history.push( url );
    }

    pendingSemTileClicked( vidId ){
        var url = Utils.getSeminarForPUrl( vidId );
        this.context.router.history.push( url );
    }

    videoTileClicked( vidId ){
        var url = Utils.getVideoUrl( vidId );
        this.context.router.history.push( url );
    }

    generateRecVidsGrid(){

        var that = this;
        if( Utils.isNonEmptyArray( this.state.recVideos ) ) {
            return (
                <div>
            <div className="">
                Recommeded Videos for you:
            </div>
                <div style={styles.root}>
                    <GridList style={styles.gridList} cols={2.2}>
                        {this.state.recVideos.map((tile) => (
                            <GridTile
                                key={tile.thumbImage}
                                title={tile.description}
                                subtitle={Utils.getStringFromArr( tile.tags ) }
                                titleStyle={styles.titleStyle}
                                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                                onClick={ that.videoTileClicked.bind( that, tile.videoId ) }
                            >
                                <img src={tile.thumbImage}/>
                            </GridTile>
                        ))}
                    </GridList>
                </div>
                    </div>
            )
        } else {
            return null;
        }

    }

    generateRecSemsGrid(){
        var that = this;
        if( Utils.isNonEmptyArray( this.state.recSeminars ) ) {
            return (
                <div>
            <div className="">
                Recommeded Seminars for you:
            </div>
                    <div style={styles.root}>
                        <GridList style={styles.gridList} cols={2.2}>
                            {
                                this.state.pendingSeminars.map( function (tile, index) {
                                    var tileImg = tile.thumbImage ? tile.thumbImage : '/images/default_video.png';
                                    return (
                                        <GridTile
                                            key={'homepage_'+index}
                                            title={tile.title}
                                            subtitle={Utils.getStringFromArr( tile.tags ) }
                                            titleStyle={styles.titleStyle}
                                            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                                            onClick={ that.recSemTileClicked.bind( that, tile.videoId ) }
                                        >
                                            <img src={tileImg}/>
                                        </GridTile>
                                    )
                                })
                            }
                        </GridList>
                    </div>
                    </div>
            )
        } else {
            return null;
        }

    }
    generatePendingSemsGrid(){
        var that = this;
        if( Utils.isNonEmptyArray( this.state.pendingSeminars ) ) {
            return (
                <div>
            <div className="">
                Seminars you have to give:
            </div>
                <div style={styles.root}>
                    <GridList style={styles.gridList} cols={2.2}>
                        {
                            this.state.pendingSeminars.map( function (tile, index) {
                            var tileImg = tile.thumbImage ? tile.thumbImage : '/images/default_video.png';
                                return (
                            <GridTile
                                key={'homepage_'+index}
                                title={tile.title}
                                subtitle={Utils.getStringFromArr( tile.tags ) }
                                titleStyle={styles.titleStyle}
                                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                                onClick={ that.pendingSemTileClicked.bind( that, tile.videoId ) }
                            >
                                <img src={tileImg}/>
                            </GridTile>
                                )
                        })
                        }
                    </GridList>
                </div>
                    </div>
            )
        } else {
            return null;
        }
    }

    componentDidMount(){
        var that = this;
        //Promise.all([ requests.getRecommendations( ), requests.getPendingSeminars() ])
        Promise.all([ DDP.getRecommendations(), DDP.getPendingSeminars() ])
            .then(function (allData) {
                that.setState( { recVideos : that.getRecVideos( allData[0] ), recSeminars:  allData[0].seminars , pendingSeminars: allData[1] });
            })
    }

    render(){
        return(
            <div className="homepage">
                <div className="row">
                { this.generateRecVidsGrid() }
                    </div>
                <div className="row">
                { this.generateRecSemsGrid() }
                    </div>
                <div className="row">
                { this.generatePendingSemsGrid() }
                    </div>
                </div>
        )
    }

}

Homepage.contextTypes = {
    router: PropTypes.object
}
export default Homepage;