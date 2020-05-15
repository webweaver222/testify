const initialPublisher = {
    testNameError: null,
    hoveredQuestion: null
}

const upadateTestPublisher = (state, action) => {
   

    if (state === undefined) {
        return {
            ...initialPublisher
        }
    }

    const {testPublisher, testPublisher: {testNameError, hoveredQuestion}, testCreator} = state
   
    switch (action.type) {

        case 'PUBLISH_HOVER_QUESTION' : {
           const id = action.payload === hoveredQuestion ? null : action.payload
                
            return {
                ...testPublisher,
                hoveredQuestion: id
            }
        }

        case 'CLICK_PUBLISH_TEST' : {
            return {
                ...testPublisher,
                testNameError: testCreator.testName === '' ? 'You have to name your test' : null
            }
        }

        case 'FETCH_PREP': {
            if (testNameError === null) {
                return {
                    ...testPublisher
                }
            }
        }

        default: 
            return testPublisher;
        
    }

}

export default upadateTestPublisher