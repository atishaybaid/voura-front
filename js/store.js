import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer,
    compose(
        applyMiddleware(thunk),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));


export default store;
