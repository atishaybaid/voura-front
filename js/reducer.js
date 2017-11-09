import {SHOW_LOGIN_DIALOG} from './actions';
import {SET_EMAIL,SET_PASSWORD} from './actions';


const DEFAULT_STATE ={
    login :{
            showDialog:false,
            email:'',
            password:''
    },
    signup:{
        email:'',
        password:''
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

const rootReducer = (state = DEFAULT_STATE,action)=>{
    switch(action.type){
        case SHOW_LOGIN_DIALOG:
            return showLoginDialog(state);
        case SET_EMAIL:
            return setEmail(state,action);
        case SET_PASSWORD:
            return setPassword(state,action);
        default:
            return state;

    }
}


export default rootReducer;