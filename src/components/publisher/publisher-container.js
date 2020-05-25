import React from 'react'
import { connect } from 'react-redux';


import QuestionPool from '../question-pool'
import Publisher from './publisher'
import './publisher.sass'

const PublisherContainer = ({questions, onBack, emptyQuestions, onPublish, fetching, error}) => {

    const warning = emptyQuestions.length > 0 ? 

    <div className="warning">
           Question
           {
               questions.map((question,i) => {
                    if (emptyQuestions.includes(question.id)) {
                        return <span key={i}> {i+1} </span>
                    }
               })
           } has empty body and/or less than two full answers. Thus will be deleted.
    </div> :null


    let content = 
        <React.Fragment>
            <h2>Publish page</h2>
            <div className="row">
                <label htmlFor="">Creator Email</label>
                <input type="text" />
            </div>
            <div className="row">
                <label htmlFor="">Estimated time (min)</label>
                <input className="time-input" type="number" />
            </div>

            {warning}

            <QuestionPool questions={questions} />

            <div className="row control-buttons">
                <button className="btn btn-info" onClick={onBack}>Back</button>
                <button className="btn btn-info publish-final" onClick={onPublish}>Publish Test</button>
            </div>
        </React.Fragment>


    const preloader = fetching? true: null


    return <Publisher content={content} preloader={preloader} error={error}/>
}

const mapStateToProps = ({testPublisher: {emptyQuestions, fetching, error}}) => {
    return {
        emptyQuestions, 
        fetching,
        error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
       
}

export default connect(mapStateToProps, null)(PublisherContainer)