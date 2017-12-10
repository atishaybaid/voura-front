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

function searchQuestionsByTag( data ){

    var promise = new Promise( function ( resolve, reject ) {
        GetReq(`questions/questionbytag?tags=${data.searchedTag}&page=${data.page}&limit=${data.limitPerPage}`, iVConfigs.tags.url)
            .then(function (response) {
                if (response.status == 200 && response.data.status == 'SUCCESS') {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            })
            .catch(function (error) {
                return error;
            });
    });
    return promise;
}

function _responseHandler( resolve, reject ) {
    var f = function(response) {
        if (response.status == 200 && response.data.status == 'SUCCESS') {
            resolve(response.data.data);
        } else {
            reject(response);
        }
    }
    return f;
}

function _catchHandler() {
    var f = function (error) {
        console.log(error);
        return error;
    }
    return f;
}
function signout() {

    var path ='/users/signout';
    var that = this;
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

export default { getUserInfo, fetchSeminarData, searchQuestionsByTag, signout }