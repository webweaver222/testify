import React from 'react'
import { connect } from 'react-redux';


import './question-pool.sass'
import { handleDnD, clickQuestion, deleteQuestion, questionHover } from '../../actions/creatorActions'


import RLDD from 'react-list-drag-and-drop/lib/RLDD';

class QuestionPool extends React.Component {



    render() {
        const { questions, onDnd, onActive, onDelete, onAdd, hoveredQuestion, onHover} = this.props

        return (
            <div className="question-pool">
                <RLDD
                    items={questions}
                    itemRenderer={(question, index) => {

                        const questionClass = hoveredQuestion === question.id ? 
                        'dropdown-question question-hovered': 'dropdown-question'

                        const addQuestionBtn = (index === questions.length - 1) ?
                            <div className="add-button">
                                <i className="fa fa-plus-circle"
                                    onClick={onAdd}></i>
                            </div> : null

                        const delete_visility = index === 0 ?
                            { visibility: 'hidden' } : null

                        const questionHoverDetails =
                            <div className={questionClass}>
                                <div className="question-body">
                                    {question.body}
                                </div>
                                <ul className="question-answers">
                                    {
                                        question.answers.map((answer, i) => {
                                            return <li key={answer.id}>
                                                {`${i + 1}. `}
                                                {answer.body}
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                           

                        return (
                            
                                <div className="question-wrapper">
                                <div className="question"
                                    onClick={() => onActive(index)}
                                    onMouseEnter={() => onHover(question.id)}
                                    onMouseLeave={() => onHover(question.id)}>
                                    <div className="question-header">
                                        <div className='question-header-title'>Question {index + 1}</div>
                                        <i className="fa fa-times" style={delete_visility} onClick={(event) => {
                                            event.stopPropagation()
                                            onDelete(index)
                                        }}></i>
                                    </div>
                                </div>
                                {questionHoverDetails}
                                {addQuestionBtn}
                                </div>
                            
                        );
                    }}
                    onChange={onDnd}
                />
            </div>

        )
    }
}

const mapStateToProps = ({testPublisher: {hoveredQuestion}}) => {
    return {
        hoveredQuestion
    };
  };

const mapDispatchToProps = (dispatch, { onActive }) => {

    return {
        onDnd: (newItems) => dispatch(handleDnD(newItems)),
        onActive: (onActive) || ((id) => dispatch(clickQuestion(id))),
        onDelete: (id) => dispatch(deleteQuestion(id)),
        onAdd: () => dispatch('CLICK_ADD_QUESTION'),
        onHover: (id) => dispatch(questionHover(id))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(QuestionPool)