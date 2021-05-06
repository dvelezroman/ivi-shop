import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css'
import './carousel.css'
import 'toasted-notes/src/styles.css';
ReactDOM.render((
	<BrowserRouter>
        <Route path="/" component={App} />
	</BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
    //<Route exact path="/" component=About/>
    //<Route exact path="/" component=Contact/>

    //<Route path="/about" component=About/>
    //<Route path="/contact" component=Contact/>
serviceWorker.unregister();
