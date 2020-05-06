import React from 'react'

import { connect } from 'react-redux';
import {questionBodyChange, answerBodyChange} from '../../actions/creatorActions'



import './question.sass'


const Question = ({question, onNext, onPrev, onChangeQuestionBody, onChangeAnswerBody}) => {

    const renderAnswers = () => {
        return question.answers.map((answer, i) => {
            return (
                <div className="answer" key={answer.id}>
                    <label htmlFor="answer-body">Answer {i+1}</label>
                    <input name ='answer-body' type="text"  value={answer.body}
                    onChange={(e) => onChangeAnswerBody(answer.id, e.target.value)}/>
                </div>
            )
        })
    }
    
    return (
        
        <div className="question">
                <div className="row">
                    <label htmlFor="question-body">Question</label>
                    <textarea  value={question.body} name ='question-body' 
                    onChange={(e) => onChangeQuestionBody(e.target.value)}
                    type="text" rows="4" cols="40"/>
                </div>

                <div className="answers-section">
                   {renderAnswers()}
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
        onChangeQuestionBody:  (body) => dispatch(questionBodyChange(body)),
        onChangeAnswerBody: (answerId, body) => dispatch(answerBodyChange(answerId, body))
     }
    }


export default connect(null, mapDispatchToProps)(Question)