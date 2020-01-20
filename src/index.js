import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import App from './App';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
<BrowserRouter>
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>  
</BrowserRouter>, 
document.getElementById('root'));

serviceWorker.unregister();
