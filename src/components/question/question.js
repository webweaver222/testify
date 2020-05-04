

import { connect } from 'react-redux';
import {questionBodyChange} from '../../actions/creatorActions'



import './question.sass'


const Question = ({question, onNext, onPrev, onChangeBody , children}) => {
    
    return children(question, onNext, onPrev, onChangeBody)
}





const mapStateToProps = ({}) => {
    return null
  };

  const mapDispatchToProps = (dispatch)=> {
    
     return {
        onNext: () => dispatch('SELECT_QUESTION_NEXT'),
        onPrev: () => dispatch('SELECT_QUESTION_PREV'),
        onChangeBody:  (questionId, body) => dispatch(questionBodyChange(questionId, body))
     }
    }


export default connect(null, mapDispatchToProps)(Question)