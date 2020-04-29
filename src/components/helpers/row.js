import React from 'react'

const leftDiv = {
    backgroundColor: 'yellow',
    width: '50%',
    height: '100%'
  };

  const rightDiv = {
    backgroundColor: 'red',
    width: '50%',
    height: '100%'
  };

const Row = ({children}) => {
   
    return (
        <React.Fragment>
        <div style={leftDiv}>{children[0]}</div>
        <div style={rightDiv}>{children[1]}</div>
        </React.Fragment>
    )
}

export default Row