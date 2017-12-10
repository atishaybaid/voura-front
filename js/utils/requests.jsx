import {GetReq, PostReq} from './apiRequest';
import iVConfigs from '../../Configs/local.json';

function getUserInfo( userId ){
    var that = this, path;

    if( userId )
        path ='users/getuser/?id='+userId;
    else
        path ='users/getuser';

    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then(function (response) {
                if(response.status == 200 && response.data.status == 'SUCCESS'){
                    resolve( response.data.data );
                } else {
                    reject( response );
                }
            })
            .catch(function (error) {
                return error;
            });
    } );
    return promise;
}

function fetchSeminarData( data ){
    var videoId = data.videoId;
    var path ='seminar/?videoId='+videoId;
    var that = this;
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path )
            .then(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    resolve( response.data.data );
                } else {
                    reject( response );
                }

            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    });
    return promise;
}

export default { getUserInfo, fetchSeminarData }