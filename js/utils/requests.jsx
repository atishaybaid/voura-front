import {GetReq, PostReq, PutReq, DeleteReq} from './apiRequest';
import iVConfigs from '../../Configs/local.json';
import Utils from './common.js';
import { withCookies, Cookies } from 'react-cookie';

function getUserInfo( userId ){

    var path ='/users/getuser/';
    if( userId )
        path = path + '?id='+userId;
    
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function fetchSeminarData( data ){
    var videoId = data.videoId;
    //var path ='seminar/?videoId='+videoId;
    var path ='seminar/public/?videoId='+videoId;
    var that = this;
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function searchQuestionsByTag( data ){

    var promise = new Promise( function ( resolve, reject ) {
        GetReq(`questions/public/questionbytag?tags=${data.searchedTag}&sortBy=${data.sortBy}&page=${data.page}&limit=${data.limitPerPage}`, iVConfigs.tags.url)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function _responseHandler( resolve, reject ) {

    var f = function(response) {
        if ( response.status == 200 && Utils.isNonEmptyObject( response.data ) ) {

            if( response.data.status == 401 ) {
                //redirect to login page
                //console.log('got 401 for below');
                //console.log( response );
                //window.location.href = '/';
                document.body.innerHTML = 'This page requires you to be logged into intelverse. Redirecting you to login page. If automatic redirection fails, please <a href="/">click here</a>';
                setTimeout(function () {
                    window.location.href = "/"; //will redirect to your blog page (an ex: blog.html)
                }, 2000);
            } else if( response.data.status == 'SUCCESS' ){
                resolve(response.data.data);
            } else {
                reject(response);
            }
        } else if ( response.status == 200 ){
            // response.data is empty
            resolve( true );
        }else {
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
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function signup( data ) {
    var path = 'users/signup';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}
function fetchTags( searchText ) {

    //var path = `users/suggestions/tag?t=${searchText}`;
    var path = `users/public/suggestions/tag?t=${searchText}`;
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.tags.url )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;

}

function updateTags( data ){
    var path = 'users/tags';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function getPersonSearch( data ) {
    var path = 'users/search';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;

}

function getSeminarSearch( data ){
    var path = 'event/search';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;

}


function getVideoSearch( data ){
    var path = 'questions/search';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;

}

//comma separated userids

function getUsersInfo( userIds ){
    var that = this, path;

    path ='users/public/getusers/?id='+userIds;

    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.tags.url )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    })
    return promise;
}

function getFollowStatus( userId ){
    var path ='users/public/isfollows?id='+userId;

    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function handleFollowUnfollow( path ){
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function saveQuestion( data ) {
    var path ='questions/save';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function signin(data) {
    var path ='users/signin';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;

}

function createSeminar( data ) {
    var path = iVConfigs.seminar.createSeminarEndpoint;
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function getTopQuestionsForSeminar( data ) {
    var path ='questions/topquestion/?videoid='+data.videoId+'&n='+data.limit;
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function setSeminarQuestionStatus( data ) {
    var path ='questions/status';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function getStreamStatus( data ) {
    var path = 'seminar/stream/status';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function liveSeminar( data ) {
    var path = 'seminar/live';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function completeSeminar( data ) {
    var path = 'seminar/complete';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function voteCountForQuestions( data ) {
    //var path ='questions/votecount/';
    var path ='questions/public/votecount/';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;    
}

function getQuestionsForVideo( data ) {
    //var path ='questions/find/?videoid='+data.videoId;
    var path ='questions/public/find/?videoid='+data.videoId;
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function voteQuestion( data ) {
    var path ='questions/vote/';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function getVideoData( videoId ) {
    //var path ='video/show/'+videoId;
    var path ='video/public/show/'+videoId;
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function updateProfile( data ) {
    //@todo update api
    var path ='update/profile/';
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}
/*
//use getUser instead
function getProfile( userId ) {
    //@todo update api
    if( userId )
        var path ='/profile/'+userId;
    else
        var path ='/profile/';

    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;

}

*/
function updateSeminar( data ) {
    var path ='/seminar/update/?videoId='+data.videoId;
    var promise = new Promise( function ( resolve, reject ) {
        PostReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function deleteSeminar( data ) {
    var path ='/seminar/?videoId='+data.videoId;
    var promise = new Promise( function ( resolve, reject ) {
        DeleteReq(path, data)
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function getRecommendations( data ) {
    var path ='/getrecommendation';

    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

function getPendingSeminars( data ) {
    var path ='/event/upcoming';
    var promise = new Promise( function ( resolve, reject ) {
        GetReq( path, iVConfigs.common.baseUrl )
            .then( _responseHandler( resolve, reject ) )
            .catch( _catchHandler() );
    });
    return promise;
}

export default { getUserInfo, fetchSeminarData, updateSeminar, deleteSeminar, searchQuestionsByTag, signin, signout, signup, fetchTags, updateTags, getPersonSearch, getSeminarSearch, getVideoSearch, getUsersInfo, getFollowStatus, handleFollowUnfollow, saveQuestion, createSeminar,getTopQuestionsForSeminar, setSeminarQuestionStatus, getStreamStatus, liveSeminar, completeSeminar, voteCountForQuestions, getQuestionsForVideo, voteQuestion, getVideoData, updateProfile, getRecommendations, getPendingSeminars
}