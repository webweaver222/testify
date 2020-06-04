import React from 'react'
import { connect } from 'react-redux';

import './test-room.sass'

import {processAnswer} from '../../actions/creatorActions'
import Question from '../question'




const TestRoom = ({test, current, answers, onFinishProcess}) => {

    /**<QuestionsField /> */
   
    return (
        <div className="test-room white-block">
            
            <Question question={test.questions[current]} 
            finalQuestion = {test.questions.length - 1 }
            selected={answers[current]} 
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

const mapDispatchToProps = (dispatch, {service}) => {
    return {
        onFinishProcess: () => console.log('finish')//dispatch(() => finishProcess(service))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TestRoom)

