import React from 'react'
import { Route, Switch } from 'react-router-dom';

import './app.sass'
//import Preloader from '../preloader'
import TestCreator from '../test-creator'


const App = () => {
 
    return (
        <div className="app">
            <Switch>
                    <Route path="/test/create" component={TestCreator} />
                   {/*<Route path="/test/:id">
                        <div>kgigpe</div>
                    </Route>*/}
            </Switch>
            
        </div>
    )
}

export default App
