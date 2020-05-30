import React from 'react'

import { withRouter } from 'react-router-dom';
import { compose } from '../../utils'
import withService from '../hoc/withService'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


import './test-process.sass'

import TestIntro from '../test-intro'
import { getTest } from '../../actions/creatorActions'


class TestProcess extends React.Component {

    componentDidMount() {
        const {id} = this.props.match.params
        this.props.onMount(id)
    }

    componentDidUpdate() {

    }


    render() {
        const {test, onStart} = this.props
        
        return (
            <div className="test-process">
                <TestIntro onStartTest={onStart}/>
            </div>
        )
    }
}


const mapStateToProps = ({ testProcess: {test} }) => {
    return {
        test
    }
}


const mapDispatchToProps = (dispatch, { match, service }) => {
    return bindActionCreators({
        onMount: (testId) => getTest(service)(testId),
        onStart: () => {}
    }, dispatch)
}

export default compose(
    withService,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TestProcess)
