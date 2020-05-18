import React from 'react'
import { Route, Switch } from 'react-router-dom';

import './test-creator.sass'
import { connect } from 'react-redux';
import {compose} from '../../utils'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux'

import TestCreatorMain from '../test-creator-main'
import Question from '../question'
import QuestionPool from '../question-pool'
import Publisher from '../publisher'
import { publishTest, finalPublish } from '../../actions/creatorActions'
import withService from '../hoc/withService'

class TestCreator extends React.Component {


    render() {
        const { questions, active, history} = this.props

        const question = questions.find(q => q.id === active)


        return (
            <div className="test-creator">
                
                <Switch>
                    <Route path="/" exact>
                        <div className="left">
                            <TestCreatorMain onPublishTest={() => this.props.publishTest()} />
                            <Question question={question} />
                        </div>
                        <div className="right">
                            <QuestionPool questions={questions} />
                        </div>
                    </Route>

                    <Route path="/test" exact>
                        <Publisher questions={questions} onBack={() => history.goBack()}
                        onPublish={() => this.props.onFinalPublish()}/>
                    </Route>
                        
        
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = ({ testCreator: { questions, active } }) => {
    return {
        questions,
        active 
    };
};

const mapDispatchToProps = (dispatch, {history, service}) => {
    return bindActionCreators({
        publishTest: publishTest(history),
        onFinalPublish: finalPublish(service),
    }, dispatch)
}


export default compose(
    withService,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TestCreator)
