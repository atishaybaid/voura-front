import{SHOW_LOGIN_DIALOG,SET_EMAIL,SET_PASSWORD,SIGNUP_SET_EMAIL,SIGNUP_SET_PASSWORD,
    REQUEST_TAGS,RECEIVE_TAGS} from './actions';
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








