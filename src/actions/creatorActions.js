const testNameChange = (name) => {
   
    return {
        type: 'CHANGE_TEST_NAME',
        payload: name
    }
}

const testDescriptionChange = (description) => {
    return {
        type: 'CHANGE_TEST_DESCRIPTION',
        payload: description
    }
}


export {testNameChange, 
    testDescriptionChange}