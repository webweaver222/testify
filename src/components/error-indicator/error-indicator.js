import React from 'react'


import './error-indicator.sass'

const ErrorIndicator = ({message = null, type}) => {

    const errorType = type === 'error'? 
    'alert alert-danger' : 'alert alert-warning'

    return (
        <div className="error-indicator">
            <div className={errorType} >
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ErrorIndicator