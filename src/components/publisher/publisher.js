import React from 'react'
import { connect } from 'react-redux';


import QuestionPool from '../question-pool'
import './publisher.sass'

const Publisher = ({questions, onBack}) => {
    return (
        <div className="publisher">
        <h2>Publish page</h2>
        <div className="row">
            <label htmlFor="">Creator Email</label>
            <input type="text"/>
        </div>
        <div className="row">
            <label htmlFor="">Estimated time (min)</label>
            <input className="time-input" type="number"/>
        </div>
        <QuestionPool questions={questions} />
        <div className="row control-buttons">
        <button className="btn btn-info" onClick={onBack}>Back</button>
        <button className="btn btn-info publish-final">Publish Test</button>
        </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {}
       
}

export default connect(null, mapDispatchToProps)(Publisher)