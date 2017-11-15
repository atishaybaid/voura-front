import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import { CookiesProvider } from 'react-cookie';

const ClientApp = () =>(
    <CookiesProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CookiesProvider>
)


ReactDom.render(<ClientApp />, document.getElementById('app'));


export default ClientApp;