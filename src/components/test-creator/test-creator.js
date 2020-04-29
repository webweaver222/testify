import React from 'react'

import './test-creator.sass'
import { connect } from 'react-redux';


//import Row from '../helpers/row'
import TestCreatorMain from '../test-creator-main'
import Question from '../question'

class TestCreator extends React.Component {





    render () {
        const {question} = this.props

        return (
            <div className="test-creator">
               <div className="left">
                    <TestCreatorMain/>
                    <Question question={question}/>
               </div>
               <div className="right">

               </div>
            </div>
        )
    }
}

const mapStateToProps = ({testCreator: {questions}}) => {

    return {
       question: questions[0]
    };
  };

export default connect(mapStateToProps)(TestCreator)
