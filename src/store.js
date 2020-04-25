import {createStore, applyMiddleware} from 'redux'

import reducer from './reducers'

const stringMdw = (store) => (dispatch) => (action) => {
    if (typeof action === 'string')
    return dispatch({
        type: action
    })
}


const store = createStore(reducer, applyMiddleware(stringMdw))


export default store