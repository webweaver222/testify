import React from 'react'

const renderQuestionCreator = (question, onNext, onPrev, onChangeBody) => {
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


export default renderQuestionCreator