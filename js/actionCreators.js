import{SHOW_LOGIN_DIALOG,SET_EMAIL,SET_PASSWORD,SIGNUP_SET_EMAIL,SIGNUP_SET_PASSWORD,
    REQUEST_TAGS,RECEIVE_TAGS,FETCH_SCHEDULE_DATA,RECEIVE_SCHEDULE_DATA} from './actions';
import {PostReq,GetReq} from './utils/apiRequest.jsx';
//login methods
export function showLoginDialog(){
    return {type:SHOW_LOGIN_DIALOG}
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
                console.log(res.data);
                dispatch(receiveScheduleData(res.data))
            })
            .catch((err)=>{
                console.log(err);
            })

    }
}




export function receiveScheduleData(data){
    return {type:RECEIVE_SCHEDULE_DATA,payload:data};
}



//Home Page Methods
 export function fetchVideoData(){
    return function(dispatch){
        return GetReq('getrecommendation?user=vinaysahuhbti@gmail.com',null,'http://13.58.172.179:8080/')
            .then((res)=>{
                let videoData = JSON.parse(res.data.data);
                console.log(res);
                //dispatch(receiveTags(tagList));

            })
            .catch((err)=>{
                console.log(err);
            })
              

   }

 }



