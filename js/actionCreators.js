import{SHOW_LOGIN_DIALOG,SET_EMAIL,SET_PASSWORD} from './actions';

export function showLoginDialog(){
    return {type:SHOW_LOGIN_DIALOG}
}


export function setEmail(value){
    return {type:SET_EMAIL,payload:value}
}


export function setPassword(value){
    return {type:SET_PASSWORD,payload:value}
}

