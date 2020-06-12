import React from 'react';
import { connect } from 'react-redux';

const Confirm = ({answers, onBack, onSend}) => {

    
    let n = answers.every(a=>a===undefined)? answers.length : answers.filter(a=>a===undefined).length

    const w = n > 1 ? 'questions' : 'question'

    const warning = n > 0 ? `You didn't answer on ${n} ${w} out of ${answers.length}. Send it like that?` : 
    'Please confirm sending your test'

    return (
        <div className="confirm white-block">
            <h2> - Final Stage - </h2>
            <p>{warning}</p>
            <div className="myrow">
                <button className="btn btn-info" onClick={onBack}>Back</button>
                <button className="btn btn-info" onClick={onSend}>Send Test</button>
            </div>
        </div>);
}

export default connect(({testProcess: {answers}}) => {
    return {answers}
}, null)(Confirm);