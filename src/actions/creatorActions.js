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

const questionBodyChange = (id, body) => {
    return {
        type: 'CHANGE_QUESTION_BODY',
        id: id,
        payload: body
    }
}

const handleDnD = (newItems) => {
    return {
        type: 'CHANGE_DRAG_DROP',
        payload: newItems
    }
}

const clickQuestion = (id) => {
   
    return {
        type: 'CLICK_ACTIVE_QUESTION',
        payload: id
    }
}



export {testNameChange, 
    testDescriptionChange,
    questionBodyChange,
    handleDnD,
    clickQuestion}