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
        type: 'HOVER_QUESTION',
        payload: id
    }
}


const createNewTest = (history) => () => (dispatch) => {
   dispatch('RESET_STORE')
   history.push('/test/create')
}

const publishTest = (history) => () => (dispatch) => {
    dispatch('CLICK_PUBLISH_TEST')
    dispatch('FETCH_PREP')
    history.push('/test/create/publish')
}

const finalPublish = (service) => () => async (dispatch, getState) => {

    dispatch('SAVE_TEST_START')

   const { 
    testCreator: {
        active, 
        hoveredQuestion, 
        ...testCreator 
    }
    , testPublisher} = getState()

   const notEmptyQuestions = testCreator.questions.filter((question) => 
   !testPublisher.emptyQuestions.includes(question.id))

   const test = {
       ...testCreator,
       questions: notEmptyQuestions,
   }
   
  
   try {
    const res = await service.post(test, '/test')
    const body = await res.json()
    
    if (!res.ok) {
        return dispatch({
            type: 'SAVE_TEST_FAIL',
            payload: `Response status code ${res.status}. ${res.statusText}`
        })
     } 

     dispatch({
        type: 'SAVE_TEST_SUCCESS',
        payload: body.testUrl
     })

    }
   catch (e) {
    dispatch({
        type: 'SAVE_TEST_FAIL',
        payload: `Can't reach server`
    })
   }
   

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
    questionHover,
    finalPublish,
    createNewTest}