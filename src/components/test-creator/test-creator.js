import React from 'react'
import { Route, Switch } from 'react-router-dom';

import './test-creator.sass'
import { connect } from 'react-redux';
import {compose} from '../../utils'
import {withRouter} from 'react-router-dom';

import TestCreatorMain from '../test-creator-main'
import Question from '../question'
import QuestionPool from '../question-pool'
import Publisher from '../publisher'
import { publishTest } from '../../actions/creatorActions'

class TestCreator extends React.Component {


    onPublishTest = () => {
        this.props.publishTest()
    }

    render() {
        const { questions, active, history } = this.props

        const question = questions.find(q => q.id === active)


        return (
            <div className="test-creator">
                
                <Switch>
                    <Route path="/" exact>
                        <div className="left">
                            <TestCreatorMain onPublishTest={this.onPublishTest} />
                            <Question question={question} />
                        </div>
                        <div className="right">
                            <QuestionPool questions={questions} />
                        </div>
                    </Route>

                    <Route path="/test" exact>
                        <Publisher questions={questions} onBack={() => history.goBack()}/>
                    </Route>
                        
        
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = ({ testCreator: { questions, active } }) => {
    return {
        questions: questions,
        active 
    };
};

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        publishTest: publishTest(dispatch, history)
    }
}


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TestCreator)
