import React from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'

import './test-room.sass'

import {processAnswer, selectInField} from '../../actions/creatorActions'
import Question from '../question'
import QuestionsField from '../questions-field'
import Timer from '../timer'



const TestRoom = ({test, current, answers, onFinishProcess, onSelectField}) => {

    
    return (
        <div className="test-room white-block">
            <Timer/>
            <QuestionsField onSelectQuestion = {onSelectField}/>
            <Question question={test.questions[current]} 
            finalQuestion = {test.questions.length}
            selectedAnswer={answers[current]}
            current={current} 
            onFinishProcess = {onFinishProcess}
            mapDispatch={(dispatch) => {
                return {
                    onNext: () => dispatch('PROCESS_NEXT_QUESTION'),
                    onPrev: () => dispatch('PROCESS_PREV_QUESTION'),
                    onSelectAnswer: (idx) => dispatch(processAnswer(idx, current)),
                    onChangeQuestionBody: () => {},
                    onChangeAnswerBody:() => {},
                    onAddAnswer: () => {},
                    onDeleteAnswer: () => {},
                }
            }} />
        </div>
    )
}



const mapStateToProps = ({ testProcess: {test, current, answers}}) => {
    return {
        test,
        current,
        answers
    }
}

const mapDispatchToProps = (dispatch, {history, service}) => {
    return bindActionCreators({
        onSelectField: (idx) => selectInField(idx),
        //onFinishProcess: finishProcess(history)
    }, dispatch)

}


export default connect(mapStateToProps, mapDispatchToProps)(TestRoom)

