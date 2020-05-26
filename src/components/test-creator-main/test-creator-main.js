import React from 'react'
import { connect } from 'react-redux';
import './test-creator-main.sass'

import ErrorIndicator from '../error-indicator'

import {testNameChange, testDescriptionChange} from '../../actions/creatorActions'

const TestCreatorMain = ({onPublishTest, testName, testDerscription, testNameError,
                    onNameChange, onDescriptionChange}) => {

    const errorNotif = testNameError? 
    <ErrorIndicator message={testNameError}
    type='error' /> : null

    const inputClass =  testNameError? 'withError': ''

    
    return (
        <div className="test-creator-main white-block">
            <div className="myrow">
            <label htmlFor="test-name">Test Name</label>
            <input name ='test-name' type="text" 
            className={inputClass}
            value={testName}
            onChange={(e) => onNameChange(e.target.value)}/>
            <div className="notification">
            {errorNotif}
            </div>
            </div>

            <div className="myrow">
            <label htmlFor="test-descr">Description</label>
            <textarea name ='test-descr' rows="4" cols="30"
            value={testDerscription}
             onChange={(e) => onDescriptionChange(e.target.value)}/>
            </div>

            <button className="btn btn-primary" onClick={onPublishTest}>Publish test</button>
        </div>
    )
}

const mapStateToProps = ({testPublisher: {testNameError},testCreator: {testName, testDerscription}}) => {

    return {
        testName,
        testDerscription,
        testNameError
    };
  };


const mapDispatchToProps = {
    onNameChange: testNameChange,
    onDescriptionChange: testDescriptionChange
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCreatorMain)