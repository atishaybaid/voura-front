import {SHOW_LOGIN_DIALOG,SET_EMAIL,SET_PASSWORD,SIGNUP_SET_EMAIL,SIGNUP_SET_NAME,
    SIGNUP_SET_PASSWORD,REQUEST_TAGS,RECEIVE_TAGS,RECEIVE_SCHEDULE_DATA, RECEIVE_NOTIS,
TOGGLE_EDIT_PROFILE,PROFILE_NAME_CHANGE,PROFILE_TITLE_CHANGE,PROFILE_DESC_CHANGE,
PROFILE_INST_CHANGE,PROFILE_FIELD_CHANGE,RECEIVE_VIDEO_DATA} from './actions';


const DEFAULT_STATE ={
    login :{
            showDialog:false,
            email:'',
            password:''
    },
    signup:{
       email:'',
       pass:'',
       name:''
    },
    tagList:[],
    VrScheduleGrid:{
        data:[]
    },
    home:{
        videoData:[]
    },
    profile:{
        editStatus:false,
        name:'',
        title:'',
        inst:'',
        field:''
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
    return Object.assign({},state,{signup:{email:action.payload,pass:state.signup.pass,name:state.signup.name}})
}

const signupSetPassword = (state,action)=>{
    return Object.assign({},state,{signup:{email:state.signup.email,pass:action.payload,name:state.signup.name}})
}
const signupSetName = (state,action)=>{
    return Object.assign({},state,{signup:{email:state.signup.email,pass:state.signup.pass,name:action.payload}})
}

const receiveTags = (state,action)=>{
    return Object.assign({},state,{tagList:action.payload});
}

const receiveNotifications = (state,action)=>{
    return Object.assign({},state,{notifications:{ notiList:action.payload} });
}

const receiveSheduleData = (state,action)=>{
    return Object.assign({},state,{VrScheduleGrid:{data:action.payload}});

const toggleEditProfile = (state)=>{
    return Object.assign({},state,{profile:{editStatus:!state.profile.editStatus}});
}

const profileNameChange = (state,action)=>{
    return Object.assign({},state,{profile:{name:action.payload}})
}

const profileTitleChange = (state,action)=>{
    return Object.assign({},state,{profile:{title:action.payload}})
}

const profileInstChange = (state,action)=>{
    return Object.assign({},state,{profile:{inst:action.payload}})
}

const profileFieldChange = (state,action)=>{
    return Object.assign({},state,{profile:{field:action.payload}})
}

const receiveVideoData = (state,action)=>{
    console.log(action);
    return Object.assign({},state,{home:{videoData:action.payload}});

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
        case SIGNUP_SET_NAME:
            return signupSetName(state,action);
        case REQUEST_TAGS:
            return requestTags(state,action);
        case RECEIVE_TAGS:
            return receiveTags(state,action);
        case RECEIVE_SCHEDULE_DATA:
            return receiveSheduleData(state,action);
        case TOGGLE_EDIT_PROFILE:
            return toggleEditProfile(state);
        case PROFILE_NAME_CHANGE:
            return profileNameChange(state,action);
        case PROFILE_TITLE_CHANGE:
            return profileTitleChange(state,action);
        case PROFILE_INST_CHANGE:
            return profileInstChange(state,action);
        case PROFILE_FIELD_CHANGE:
            return profileFieldChange(state,action);
        case RECEIVE_VIDEO_DATA:
            return receiveVideoData(state,action);
        case RECEIVE_NOTIS:
            return receiveNotifications(state,action)
        default:
            return state;

    }
}


export default rootReducer;