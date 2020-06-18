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
import PublisherContainer from '../publisher'
import { publishTest, finalPublish, createNewTest} from '../../actions/creatorActions'
import withService from '../hoc/withService'


class TestCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {height: props.height, width: props.width};
      }
    
      componentWillMount(){
        this.setState({height: window.innerHeight, width: window.innerWidth});
      }


    render() {
        const { questions, active, history, match: {url}} = this.props

        const question = questions.find(q => q.id === active)

        const style = this.state.width < 480? {
            height: this.state.height + 'px'
        } : null

      

        return (
            <div className="test-creator">
                
                <Switch>
                    <Route path={`${url}`} exact>
                        <div className="left" style={style}>
                            <TestCreatorMain onPublishTest={() => this.props.publishTest()} />
                            <Question question={question} />
                        </div>
                        <div className="right" style={style}>
                            <QuestionPool questions={questions} />
                        </div>
                    </Route>

                    <Route path={`${url}/publish`}>
                        <PublisherContainer questions={questions} onBack={() => history.goBack()}
                        onPublish={() => this.props.onFinalPublish()}
                        onNewTest={this.props.onNewTest}/>
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
        onNewTest: createNewTest(history)
    }, dispatch)
}


export default compose(
    withService,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TestCreator)
