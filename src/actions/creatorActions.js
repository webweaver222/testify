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

const questionBodyChange = (body) => {
    return {
        type: 'CHANGE_QUESTION_BODY',
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

const deleteQuestion = (id) => {
    return {
        type: 'CLICK_DELETE_QUESTION',
        payload: id
    }
}

const answerBodyChange = (id, body) => {
    return {
        type: 'CHANGE_ANSWER_BODY',
        id,
        payload: body
    }
}



export {testNameChange, 
    testDescriptionChange,
    questionBodyChange,
    handleDnD,
    clickQuestion,
    deleteQuestion,
    answerBodyChange}