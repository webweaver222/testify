import React from 'react'

import ErrorIndicator from '../error-indicator'
import Preloader from '../preloader'



 const Publisher = ({content, preloader, error}) => {

    if (preloader) {
        content = <Preloader/>
    }

    if (error) {
        content = <ErrorIndicator message={error} type='error'/>
    }

    return (
        <div className="publisher">
            {content}
        </div>
    )
}

export default Publisher
