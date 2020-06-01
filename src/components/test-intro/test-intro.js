import React from 'react'
import { connect } from 'react-redux';

import './test-intro.sass'

import ErrorIndicator from '../error-indicator'
import Preloader from '../preloader'

import {studentNameChange} from '../../actions/creatorActions'


const TestIntro = ({testName, testDescription, fetching, error, onNameChange, onStartTest, nameError}) => {
    
    const inputErr = nameError? 
    <ErrorIndicator message = 'You have to put your name here'
    type='error' /> : null 

    const inputClass =  nameError? 'withError': ''


    const content = fetching ? <Preloader /> : 
    
        error? <ErrorIndicator message={error} type='error'/> :

        <React.Fragment>
             <div className="intro-header">
                <div className="left-pannel">
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
                    </div>

                    <div className="right-pannel">
                        <div className="myrow">
                            <span>Your Name:</span>
                            <input type="text" className= {inputClass} 
                            onChange={(e) => onNameChange(e.target.value)}/>
                             <div className="notification">
                                {inputErr}
                            </div>
                        </div>
                    </div>
                </div>
        <button className="btn btn-info"
                onClick={onStartTest}>Start Test</button>
    </React.Fragment>
        

    

    return (
        <div className="test-intro white-block">
            {content}
        </div>
    )
}


const mapStateToProps = ({ testProcess: { test : {testName, testDescription}, fetching, error, nameError}}) => {
    return {
        testName,
        testDescription,
        fetching,
        error,
        nameError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNameChange: (name) => dispatch(studentNameChange(name))
    }
}




export default connect(mapStateToProps,  mapDispatchToProps)(TestIntro)