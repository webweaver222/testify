import React from 'react'


import './question.sass'


const Question = ({question}) => {
    return (
        <div className="question">
                <div className="row">
                    <label htmlFor="question-body">Question</label>
                    <textarea  defaultValue={question.body} name ='question-body' type="text" rows="4" cols="40"/>
                </div>

                <div className="row">
                    <label htmlFor="answer-body">Answer #1</label>
                    <input name ='answer-body' type="text"  defaultValue={question.answers[0]}/>
                </div>

                <div className="row">
                    <label htmlFor="answer-body">Answer #2</label>
                    <input name ='answer-body' type="text"  defaultValue={question.answers[1]}/>
                </div>
        </div>
    )
}



export default Question