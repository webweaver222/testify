import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import './resources/vars.sass'
import './resources/reset.sass'
import './resources/main.sass'

import ErrorBoundry from './components/error-boundry'
import App from './components/app'



import store from './store'


ReactDom.render(
    <Provider store={store}>
        <ErrorBoundry>
            <Router>
                <App/>
            </Router>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'))

