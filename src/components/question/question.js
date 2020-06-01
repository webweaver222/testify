import React from 'react'

import { connect } from 'react-redux';
import {questionBodyChange, answerBodyChange, deleteAnswer, selectAnswer} from '../../actions/creatorActions'



import './question.sass'


const Question = ({question, onNext, onPrev, onSelectAnswer, onChangeQuestionBody, 
    onChangeAnswerBody, onAddAnswer, onDeleteAnswer}) => {
        
    const renderAnswers = () => {
        return question.answers.map((answer, i,arr) => {

            const addBtn = i === arr.length - 1 && arr.length - 1 < 4 ? 
            <i className="fa fa-plus-square"
            onClick={onAddAnswer}></i>
             : null

             const deleteBtn = i > 1 ? 
             <i className="fa fa-trash"
             onClick={() => onDeleteAnswer(answer.id)}></i>: null

            const active = question.rightAnswer === answer.id? 
            'active' : null

            return (
                <div className="answer" key={answer.id}>
                    <label htmlFor="answer-body">{i+1}</label>
                    <input name ='answer-body' type="text"  value={answer.body}
                    className = {active}
                    onChange={(e) => onChangeAnswerBody(answer.id, e.target.value)}
                    onClick = {() => onSelectAnswer(answer.id)}/>
                    {deleteBtn}
                    {addBtn}
                </div>
            )
        })
    }
    

    return (
        
        <div className="question white-block">
                <div className="myrow">
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
        onChangeAnswerBody: (answerId, body) => dispatch(answerBodyChange(answerId, body)),
        onAddAnswer: () => dispatch('CLICK_ADD_ANSWER'),
        onDeleteAnswer: (id) => dispatch(deleteAnswer(id)),
        onSelectAnswer : (id) => dispatch(selectAnswer(id))
     }
    }


export default connect(null, mapDispatchToProps)(Question)