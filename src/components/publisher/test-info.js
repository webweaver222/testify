import React from 'react';
import { connect } from 'react-redux';

const TestInfo = ({publisherEmail, timeLimit, 
    emailChange, limitChange}) => {
        
    return ( 
        <div className="test-info">
            <h2>Publish page</h2>
            <div className="myrow">
                <label htmlFor="">Creator Email</label>
                <input type="text" onChange={(e) => emailChange(e.target.value)} value={publisherEmail}/>
            </div>
            <div className="myrow">
                <label htmlFor="">Time limit (min)</label>
                <input className="time-input" type="number" onChange={(e) => limitChange(e.target.value)} value={timeLimit}/>
            </div>
        </div>
     );
}

const mapDispatchToProps = (dispatch) => {
    return {
        emailChange: (email) => dispatch({type:'CHANGE_PUBLISHER_EMAIL', payload: email}),
        limitChange: (time) => dispatch({type:'CHANGE_TIME_LIMIT', payload: time}),
    }
}
 
export default connect(({testPublisher: {publisherEmail, timeLimit}})=>{
    return {
        publisherEmail, 
        timeLimit
    }
}, mapDispatchToProps)(TestInfo)