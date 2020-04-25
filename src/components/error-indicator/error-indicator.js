import React from 'react'

const ErrorIndicator = ({error = null}) => {

    

    return (
        <div className="error-indicator">
            Somthing went wrong
            {error}
        </div>
    )
}

export default ErrorIndicator