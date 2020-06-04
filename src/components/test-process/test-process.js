import React from 'react'

import { withRouter } from 'react-router-dom';
import { compose } from '../../utils'
import withService from '../hoc/withService'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


import './test-process.sass'

import TestIntro from '../test-intro'
import TestRoom from '../test-room'
import { getTest, startTest } from '../../actions/creatorActions'


class TestProcess extends React.Component {

    componentDidMount() {
        const {id} = this.props.match.params
        this.props.onMount(id)
    }


    render() {
        const {onStart , started} = this.props

        const content = started? <TestRoom/> : <TestIntro onStartTest={onStart}/>
        
        return (
            <div className="test-process">
                {content}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, {service}) => {
    return bindActionCreators({
        onMount: (testId) => getTest(service)(testId),
        onStart: startTest(service)
    }, dispatch)
}

export default compose(
    withService,
    withRouter,
    connect(
        ({ testProcess: {started}}) => {
            return {
                started
            }
    }, mapDispatchToProps)
)(TestProcess)
