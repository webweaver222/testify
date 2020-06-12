import React from 'react'
import { connect } from 'react-redux';


import QuestionPool from '../question-pool'
import Publisher from './publisher'
import TestInfo from './test-info'
import './publisher.sass'

const PublisherContainer = ({questions, onBack, emptyQuestions, 
    onPublish, fetching, error, savedTestUrl, onNewTest}) => {

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


    let content = !savedTestUrl? 
        <React.Fragment>
            <TestInfo/>

            {warning}

            <QuestionPool questions={questions} />

            <div className="myrow control-buttons">
                <button className="btn btn-info" onClick={onBack}>Back</button>
                <button className="btn btn-info publish-final" onClick={onPublish}>Publish Test</button>
            </div>
        </React.Fragment>
        :
        <div className="test-url">
            <h2>Test has been saved</h2>
            <span>Test link:</span>
            <textarea defaultValue={savedTestUrl}></textarea>
            <button className="btn btn-info"
            onClick={onNewTest}>Create New Test</button>
        </div>


    const preloader = fetching? true: null


    return <Publisher content={content} preloader={preloader} error={error}/>
}

const mapStateToProps = ({testPublisher: {emptyQuestions, fetching, error, savedTestUrl}}) => {
    return {
        emptyQuestions, 
        fetching,
        error,
        savedTestUrl
    }
}


export default connect(mapStateToProps, null)(PublisherContainer)