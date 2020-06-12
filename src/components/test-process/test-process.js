import React from 'react'

import { withRouter } from 'react-router-dom';
import { compose } from '../../utils'
import withService from '../hoc/withService'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom';



import './test-process.sass'

import TestIntro from '../test-intro'
import TestRoom from '../test-room'
import Confirm from './confirm'
import { getTest, startTest, sendTest } from '../../actions/creatorActions'


class TestProcess extends React.Component {

    calculateTimeFraction() {
        const {limit, timeLeft} = this.props
        const rawTimeFraction = timeLeft / limit;
        return rawTimeFraction - (1 / limit) * (1 - rawTimeFraction);
      }    
     
     setCircleDasharray() {
         const {setSda} = this.props
        const circleDasharray = `${(
          this.calculateTimeFraction() * 283
        ).toFixed(0)} 283`;
        setSda(circleDasharray)
      }

    componentDidMount() {
        const {id} = this.props.match.params
        this.props.onMount(id)
    }

    componentDidUpdate = async (prevProps) => { 
        const {started, finished, setTimePassed, setTimeLeft ,limit,  timePassed} = this.props
        const {started : prevStarted, finished: prevFinished, timePassed : prevTime} = prevProps

        
        if (finished !== prevFinished) {
            return () => clearTimeout(this.timer)
        }
       
        if (started !== prevStarted || timePassed !== prevTime) {
            this.timer = setTimeout(() => {
                if (timePassed <= limit) {

                    setTimePassed(timePassed + 1)
                
                    setTimeLeft(limit - timePassed)
                    
                    this.setCircleDasharray()
                }
              }, 1000);
              return () => clearTimeout(this.timer)
        }
    }

    finishTest() {
        const {match: {url}, history} = this.props
        history.push(`${url}/send`)
    }
 
    render() {
        const {onStart, onSend, started, 
            finished, match: {url} , history} = this.props

        const testRoom = started && !finished? <TestRoom onFinishProcess={() => this.finishTest()}/> : null

        const intro = !started && !finished? <TestIntro onStartTest={onStart}/> : null

        const confirm = !finished? <Confirm onBack={() => history.goBack()} onSend={onSend}/>:null

        const finish = finished ? <div className="save-info white-block">
            <h2>Your answers were successfully saved!</h2>
                <button className="btn-info">Show summury</button>
            </div> : null

        return (
            <div className="test-process">
            <Switch>
                <Route path={`${url}`} exact>
                        {intro}
                        {testRoom}
                        {finish}
                </Route>

                <Route path={`${url}/send`}>
                    {confirm}
                    {finish}
                </Route>
            </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, {service}) => {
    return bindActionCreators({
        onMount: (testId) => getTest(service)(testId),
        onStart: startTest(service),
        onSend: sendTest(service),
        setTimePassed: (tp) => {return{type: 'SET_TIME_PASSED', payload: tp }},
        setTimeLeft: (tl) => {return{type: 'SET_TIME_LEFT', payload: tl }},
        setSda: (sda) => {return{type:'SET_SDA', payload: sda}}
    }, dispatch)
}

export default compose(
    withService,
    withRouter,
    connect(
        ({timer :      {timePassed, timeLeft, strokeDasharray, limit}, 
          testProcess: {started, finished}}) => {
            return {
                started,
                finished,
                timePassed, 
                timeLeft, 
                strokeDasharray,
                limit
            }
    }, mapDispatchToProps)
)(TestProcess)
