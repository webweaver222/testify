import React from 'react'

import { connect } from 'react-redux';
import {questionBodyChange} from '../../actions/creatorActions'
import { bindActionCreators } from 'redux'

import './question.sass'


const Question = ({question, onNext, onPrev, onChangeBody}) => {
    
    return (
        <div className="question">
                <div className="row">
                    <label htmlFor="question-body">Question</label>
                    <textarea  value={question.body} name ='question-body' onChange={(e) => onChangeBody(question.id, e.target.value)}
                    type="text" rows="4" cols="40"/>
                </div>

                <div className="row">
                    <label htmlFor="answer-body">Answer #1</label>
                    <input name ='answer-body' type="text"  />
                </div>

                <div className="row">
                    <label htmlFor="answer-body">Answer #2</label>
                    <input name ='answer-body' type="text"  />
                </div>
                <div className="control-buttons">
                    <button onClick={onPrev} className="btn btn-primary">Previous</button>
                    <button onClick={onNext} className="btn btn-primary">Next</button>
                </div>
        </div>
    )
}





const mapStateToProps = ({}) => {
    return null
  };

  const mapDispatchToProps = (dispatch)=> {
    
     return {
        onNext: () => dispatch('SELECT_QUESTION_NEXT'),
        onPrev: () => dispatch('SELECT_QUESTION_PREV'),
        onChangeBody:  (questionId, body) => dispatch(questionBodyChange(questionId, body))
     }
    }


export default connect(null, mapDispatchToProps)(Question)