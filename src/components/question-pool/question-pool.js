import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import './question-pool.sass'
import {handleDnD, clickQuestion, deleteQuestion} from '../../actions/creatorActions'

import RLDD from 'react-list-drag-and-drop/lib/RLDD';

class QuestionPool extends React.Component {

  

    render() {
        const { questions, onDnd, onActive, onDelete } = this.props
       
        return (
            <div className="question-pool">
                <RLDD
                    items={questions}
                    itemRenderer={(question, index) => {

                        const delete_visility = index === 0? 
                         { visibility: 'hidden'} : null
                        
                        return (
                            <div className="question"
                            
                            onClick={() => onActive(index)}>
                            <div className="question-header">
                            <i className="fa fa-times"  style={delete_visility} onClick={(event) => {
                            event.stopPropagation()
                            onDelete(index)
                            }}></i>
                            </div>
                            <p>{question.body}</p></div>
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
    return bindActionCreators({
            onDnd: (newItems) => handleDnD(newItems),
            onActive: (id) => clickQuestion(id),
            onDelete: (id) => deleteQuestion(id)
        
    }, dispatch)
   }

export default connect(null ,mapDispatchToProps)(QuestionPool)