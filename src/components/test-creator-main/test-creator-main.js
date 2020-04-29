import React from 'react'
import { connect } from 'react-redux';
import './test-creator-main.sass'

import {testNameChange, testDescriptionChange} from '../../actions/creatorActions'

const TestCreatorMain = ({testName, testDerscription,
                    onNameChange, onDescriptionChange}) => {
    
    return (
        <div className="test-creator-main">
            <div className="row">
            <label htmlFor="test-name">Test Name</label>
            <input name ='test-name' type="text" 
            onChange={(e) => onNameChange(e.target.value)}/>
            </div>

            <div className="row">
            <label htmlFor="test-descr">Description</label>
            <textarea name ='test-descr' rows="4" cols="30"
             onChange={(e) => onDescriptionChange(e.target.value)}/>
            </div>

            <button>Publish test</button>
        </div>
    )
}

const mapStateToProps = ({testCreator: {testName, testDerscription}}) => {

    return {
        testName,
        testDerscription
    };
  };


const mapDispatchToProps = {
    onNameChange: testNameChange,
    onDescriptionChange: testDescriptionChange
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCreatorMain)