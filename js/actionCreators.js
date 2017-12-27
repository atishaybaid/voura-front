import{SHOW_LOGIN_DIALOG,SET_EMAIL,HIDE_LOGIN_DIALOG,SET_PASSWORD,SIGNUP_SET_EMAIL,SIGNUP_SET_PASSWORD, SIGNUP_SET_PASSWORD2, SIGNUP_SET_NAME,
    REQUEST_TAGS,RECEIVE_TAGS,FETCH_SCHEDULE_DATA,RECEIVE_SCHEDULE_DATA,RECEIVE_NOTIS,TOGGLE_EDIT_PROFILE,
    PROFILE_NAME_CHANGE,PROFILE_TITLE_CHANGE,PROFILE_DESC_CHANGE,PROFILE_INST_CHANGE,PROFILE_FIELD_CHANGE,
    RECEIVE_PROFILE_DATA} from './actions';
import {PostReq,GetReq} from './utils/apiRequest.jsx';
//login methods
export function showLoginDialog(){
    return {type:SHOW_LOGIN_DIALOG}
}

export function hideLoginDialog(){
    return {type:HIDE_LOGIN_DIALOG}
}

export function setEmail(value){
    return {type:SET_EMAIL,payload:value}
}


export function setPassword(value){
    return {type:SET_PASSWORD,payload:value}
}



//signup methods

export function signupSetEmail(value){
    return {type:SIGNUP_SET_EMAIL,payload:value}
}


export function signupSetPassword(value){
    return {type:SIGNUP_SET_PASSWORD,payload:value}
}

export function signupSetPassword2(value){
    return {type:SIGNUP_SET_PASSWORD2,payload:value}
}

export function signupSetName(value){
     return {type:SIGNUP_SET_NAME,payload:value}
}
//User Details Methods

export function requestTags(searchText){
    return {type:REQUEST_TAGS,payload:value}
}

export function receiveTags(tagList){
    return{type:RECEIVE_TAGS,payload:tagList}
}

export function fetchTags(searchText){
   return function(dispatch){
        return GetReq(`users/suggestions/tag?t=${searchText}`,' http://api.intelverse.com:3000')
            .then((res)=>{
                let tagList = JSON.parse(res.data.data);
                dispatch(receiveTags(tagList));

            })
            .catch((err)=>{
                console.log(err);
            })
              

   }
}

//Schedule Data Function


export function fetchSheduleData(apiurl){
    return function(dispatch){
        return GetReq(apiurl,null,'https://my-json-server.typicode.com/atishaybaid/dummyApi')
            .then((res)=>{
                console.log(res.data.data);
                dispatch(receiveScheduleData(res.data.data))
            })
            .catch((err)=>{
                console.log(err);
            })

    }
}

export function receiveNotifications( data ){
    return{type:RECEIVE_NOTIS,payload:data}
}



export function receiveScheduleData(data){
    return {type:RECEIVE_SCHEDULE_DATA,payload:data};
}



//Home Page Methods
 export function fetchVideoData(){
    console.log("fetchVideoData called");
    return function(dispatch){
        return GetReq('getrecommendation?user=vinaysahuhbti@gmail.com',null,'http://13.58.172.179:8080/')
            .then((res)=>{
                console.log(res);
                let videoData = JSON.parse(res.data.data);
                console.log(videoData);
                dispatch(receiveVideoData(videoData));

            })
            .catch((err)=>{
                console.log(err);
            })
              

   }

 }


 export function receiveVideoData(videoData){
    console.log(videoData);
    return {type:RECEIVE_VIDEO_DATA,payload:videoData}
 }



//propfile page actions
export function toggleEditProfile(){
    return {type:TOGGLE_EDIT_PROFILE}
}

export function getProfileData(userId){
    return function(dispatch){
        return GetReq(`/users/getuser?id=${userId}`)
            .then((res)=>{
                let profileData = JSON.parse(res.data.data);
                console.log(res);
                dispatch(receiveProfileData(profileData));

            })
            .catch((err)=>{
                console.log(err);
            })
              

   }
}


export function receiveProfileData(profleData){
    console.log(profleData);
    return {type:RECEIVE_PROFILE_DATA,payload:profileData};
}

//edit profile methods
export function profileNameChange(value){
    return {type:PROFILE_NAME_CHANGE,payload:value}
}

export function profileTitleChange(value){
    return {type:PROFILE_TITLE_CHANGE,payload:value}
}


export function profileDescChange(value){
    return {type:PROFILE_DESC_CHANGE,payload:value}
}

export function profileInstChange(value){
    return {type:PROFILE_INST_CHANGE,payload:value}
}

export function profileFieldChange(value){
    return {type:PROFILE_FIELD_CHANGE,payload:value}
}



