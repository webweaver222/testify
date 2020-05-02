import React from 'react'
import { connect } from 'react-redux';


import './question-pool.sass'
import {handleDnD, clickQuestion} from '../../actions/creatorActions'

import RLDD from 'react-list-drag-and-drop/lib/RLDD';

class QuestionPool extends React.Component {

  

    render() {
        const { questions, onDnd, onActive } = this.props
        console.log(questions)
        return (
            <div className="question-pool">
                <RLDD
                    items={questions}
                    itemRenderer={(question) => {
                        return (
                            <div className="question"
                            onClick={() => onActive(question.id)}>
                            {question.body}</div>
                        );
                    }}
                    onChange={onDnd}
                />
            </div>
        )
    }
}

/*const mapStateToProps = ({testCreator: {questions, active}}) => {
    return {
       questions: questions,
        active
    };
  };
*/
const mapDispatchToProps = (dispatch)=> {
    return {
        onDnd: (newItems) => dispatch(handleDnD(newItems)),
        onActive: (id) => dispatch(clickQuestion(id))

    }
   }

export default connect(null ,mapDispatchToProps)(QuestionPool)