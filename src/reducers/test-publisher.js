const initialPublisher = {
    testNameError: null,
    emptyQuestions: [],
    savedTestUrl: null,
    fetching: false,
    error: null
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

        case 'SAVE_TEST_SUCCESS' : {


            return {
                ...testPublisher,
                savedTestUrl: action.payload,
                fetching: false
            }
        }

        case 'SAVE_TEST_START' : {
            return {
                ...testPublisher,
                savedTestUrl: action.payload,
                fetching: true
            }
        }

        case 'SAVE_TEST_FAIL' : {
            return {
                ...testPublisher,
                fetching: false,
                error: action.payload
            }
        }

        default: 
            return testPublisher;
        
    }

}

export default upadateTestPublisher