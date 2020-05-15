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

const deleteAnswer = (id) => {
    return {
        type: 'CLICK_DELETE_ANSWER',
        payload: id
    }
}

const selectAnswer = (id) => {
    return {
        type: 'CLICK_SELECT_ANSWER',
        payload: id
    }
}

const questionHover = (id) => {
    return {
        type: 'PUBLISH_HOVER_QUESTION',
        payload: id
    }
}

const publishTest = (dispatch, history) => () => {
    dispatch('CLICK_PUBLISH_TEST')
    dispatch('FETCH_PREP')
    history.push('/test')

   
}



export {testNameChange, 
    testDescriptionChange,
    questionBodyChange,
    handleDnD,
    clickQuestion,
    deleteQuestion,
    answerBodyChange,
    deleteAnswer,
    selectAnswer,
    publishTest,
    questionHover}