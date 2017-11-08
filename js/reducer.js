import {SHOW_LOGIN_DIALOG} from './actions';
import {HANDLE_EMAL_CHANGE} from './actions';


const DEFAULT_STATE ={
    login :{
            showDialog:false,
            email:'',
            password:''
    }
}


const showLoginDialog =  (state,action) => {
    return Object.assign({},state,{login:{showDialog:true, email:'',password:''}});
};

const handleEmailChange = (state,action)=>{
    return Object.assign({},state,{login:{showDialog:state.login.showDialog,email:action.payload,password:state.login.password}})
}

const rootReducer = (state = DEFAULT_STATE,action)=>{
    switch(action.type){
        case SHOW_LOGIN_DIALOG:
            return showLoginDialog(state);
         case HANDLE_EMAL_CHANGE:
            return handleEmailChange(state,action)
        

        default:
            return state;

    }
}


export default rootReducer;