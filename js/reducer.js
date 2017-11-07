import {SHOW_LOGIN_DIALOG} from './actions';


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

const rootReducer = (state = DEFAULT_STATE,action)=>{
    switch(action.type){
        case SHOW_LOGIN_DIALOG:
            return showLoginDialog(state);
        

        default:
            return state;

    }
}


export default rootReducer;