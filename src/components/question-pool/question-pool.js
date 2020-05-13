import React from 'react'
import { connect } from 'react-redux';


import './question-pool.sass'
import {handleDnD, clickQuestion, deleteQuestion} from '../../actions/creatorActions'


import RLDD from 'react-list-drag-and-drop/lib/RLDD';

class QuestionPool extends React.Component {

  

    render() {
        const { questions, onDnd, onActive, onDelete, onAdd, onHover} = this.props
       
        return (
            <div className="question-pool">
                <RLDD
                    items={questions}
                    itemRenderer={(question, index) => {

                        const addQuestionBtn = (index === questions.length -1) ? 
                        <div className="add-button"> 
                            <i className="fa fa-plus-circle"
                            onClick={onAdd}></i>
                        </div>: null

                        const delete_visility = index === 0? 
                         { visibility: 'hidden'} : null
                        
                        return (
                            <React.Fragment>
                            
                            <div className="question"
                            onMouseEnter = {onHover}
                            onClick={() => onActive(index)}>
                            <div className="question-header">
                            <div className='question-header-title'>Question {index+1}</div>
                            <i className="fa fa-times"  style={delete_visility} onClick={(event) => {
                            event.stopPropagation()
                            onDelete(index)
                            }}></i>
                            </div>
                            <p>{question.body}</p></div>
                            {addQuestionBtn}
                            
                            </React.Fragment>
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
const mapDispatchToProps = (dispatch, {onActive})=> {
    
    return {
            onDnd: (newItems) => dispatch(handleDnD(newItems)),
            onActive: (onActive) || ((id) => dispatch(clickQuestion(id))),
            onDelete: (id) => dispatch(deleteQuestion(id)),
            onAdd: () => dispatch('CLICK_ADD_QUESTION')
    }
   }


  

export default connect(null ,mapDispatchToProps)(QuestionPool)