import React from 'react'
import { connect } from 'react-redux';

import './test-room.sass'

import { getTest } from '../../actions/creatorActions'


const TestRoom = ({test}) => {
    return (
        null
    )
}

const mapStateToProps = ({ testProcess: {test} }) => {
    return {
        test
    }
}

const mapDispatchToProps = () => {

}

export default connect(mapStateToProps, null)(TestRoom)

