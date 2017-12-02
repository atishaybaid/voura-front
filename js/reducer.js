import {SHOW_LOGIN_DIALOG,SET_EMAIL,SET_PASSWORD,SIGNUP_SET_EMAIL,
    SIGNUP_SET_PASSWORD,REQUEST_TAGS,RECEIVE_TAGS,RECEIVE_SCHEDULE_DATA, RECEIVE_NOTIS} from './actions';


const DEFAULT_STATE ={
    login :{
            showDialog:false,
            email:'',
            password:''
    },
    signup:{
       email:'',
       pass:''
    },
    tagList:[],
    VrScheduleGrid:{
        data:[]
    },
    home:{
        videoData:[]
    },
    notifications:{
        notiList: []
    }
}


const showLoginDialog =  (state,action) => {
    return Object.assign({},state,{login:{showDialog:true, email:'',password:''}});
};

const setEmail = (state,action)=>{
    return Object.assign({},state,{login:{showDialog:state.login.showDialog,email:action.payload,password:state.login.password}})
}

const setPassword = (state,action)=>{
    return Object.assign({},state,{login:{showDialog:state.login.showDialog,email:state.login.email,password:action.payload}})
}

const signupSetEmail = (state,action)=>{
    return Object.assign({},state,{signup:{email:action.payload,pass:state.signup.pass}})
}

const signupSetPassword = (state,action)=>{
    return Object.assign({},state,{signup:{email:state.signup.email,pass:action.payload}})
}

const receiveTags = (state,action)=>{
    return Object.assign({},state,{tagList:action.payload});
}

const receiveNotifications = (state,action)=>{
    return Object.assign({},state,{notifications:{ notiList:action.payload} });
}

const receiveSheduleData = (state,action)=>{
    return Object.assign({},state,{VrScheduleGrid:{data:action.payload}});
}

const rootReducer = (state = DEFAULT_STATE,action)=>{
    switch(action.type){
        case SHOW_LOGIN_DIALOG:
            return showLoginDialog(state);
        case SET_EMAIL:
            return setEmail(state,action);
        case SET_PASSWORD:
            return setPassword(state,action);
        case SIGNUP_SET_EMAIL:
            return signupSetEmail(state,action);
        case SIGNUP_SET_PASSWORD:
            return signupSetPassword(state,action);
        case REQUEST_TAGS:
            return requestTags(state,action);
        case RECEIVE_TAGS:
            return receiveTags(state,action);
        case RECEIVE_SCHEDULE_DATA:
            return receiveSheduleData(state,action)
        case RECEIVE_NOTIS:
            return receiveNotifications(state,action)
        default:
            return state;

    }
}


export default rootReducer;