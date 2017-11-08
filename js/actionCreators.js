import {SHOW_LOGIN_DIALOG} from './actions';
import{HANDLE_EMAL_CHANGE} from './actions';

export function showLoginDialog(){
    return {type:SHOW_LOGIN_DIALOG}
}


export function handleEmailChange(value){
    return {type:HANDLE_EMAL_CHANGE,payload:value}
}

