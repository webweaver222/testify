import React from 'react'

import './test-creator.sass'
import { connect } from 'react-redux';


//import Row from '../helpers/row'

import TestCreatorMain from '../test-creator-main'
import Question from '../question'
import QuestionPool from '../question-pool'


class TestCreator extends React.Component {



    render () {
        const {questions, active} = this.props
        
        return (
            <div className="test-creator">
               <div className="left">
                    <TestCreatorMain/>
                    <Question question={questions.find(q => q.id === active)} />
               </div>
               <div className="right">
                    <QuestionPool questions = {questions}/>
               </div>
            </div>
        )
    }
}

const mapStateToProps = ({testCreator: {questions, active}}) => {
    return {
       questions: questions,
        active
    };
  };

  const mapDispatchToProps = (dispatch)=> {
     return {
       
     }
    }


export default connect(mapStateToProps, null)(TestCreator)
