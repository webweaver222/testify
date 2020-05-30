import React from 'react'
import { connect } from 'react-redux';

import './test-intro.sass'

import ErrorIndicator from '../error-indicator'
import Preloader from '../preloader'


const TestIntro = ({ testName, testDescription, fetching, error}) => {

    const content = fetching ? <Preloader /> : 
    
        error? <ErrorIndicator message={error} type='error'/> :

        <React.Fragment>
        <div className="myrow">
            <span>Test Name:</span>
            <p>{testName}</p>
        </div>

        <div className="myrow">
            <span>Test Description:</span>
            <p>{testDescription}</p>
        </div>

        <div className="myrow">
            <span>Time Limit:</span>
            <p>13</p>
        </div>
        <button className="btn btn-info">Start Test</button>
    </React.Fragment>
        

    

    return (
        <div className="test-intro white-block">
            {content}
        </div>
    )
}


const mapStateToProps = ({ testProcess: { test : {testName, testDescription}, fetching, error } }) => {
    return {
        testName,
        testDescription,
        fetching,
        error
    }
}



export default connect(mapStateToProps, null)(TestIntro)