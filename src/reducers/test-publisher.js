const initialPublisher = {
    testNameError: null,
    emptyQuestions: []
}

const upadateTestPublisher = (state, action) => {
   

    if (state === undefined) {
        return {
            ...initialPublisher
        }
    }

    const {testPublisher, testPublisher: {testNameError, hoveredQuestion}, testCreator} = state
   
    switch (action.type) {


        case 'CLICK_PUBLISH_TEST' : {
            return {
                ...testPublisher,
                testNameError: testCreator.testName === '' ? 'You have to name your test' : null
            }
        }

        case 'FETCH_PREP': {
            //if (testNameError === null) {
                const empty = []
                testCreator.questions.forEach((question) => {
                    if (question.body === '' || (question.answers.filter(a=>a.body !== '').length < 2))  {
                        empty.push(question.id)
                    }
                })


                return {
                    ...testPublisher,
                    emptyQuestions: empty
                }
            //}
        }

        default: 
            return testPublisher;
        
    }

}

export default upadateTestPublisher