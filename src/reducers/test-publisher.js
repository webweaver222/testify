const initialPublisher = {
    testNameError: null
}

const upadateTestPublisher = (state, action) => {
   

    if (state === undefined) {
        return {
            ...initialPublisher
        }
    }

    const {testPublisher, testPublisher: {testNameError}, testCreator} = state
   
    switch (action.type) {

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