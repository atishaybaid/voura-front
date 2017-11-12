import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';

const ClientApp = () =>(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)


ReactDom.render(<ClientApp />,document.getElementById('app'));



export default ClientApp;