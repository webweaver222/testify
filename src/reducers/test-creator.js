const upadateTestCreator = (state, action) => {
    if (state === undefined) {
        return {
            testName: '',
            testDerscription: '',
            questions: [{
                body: 'hello world1',
                answers: ['test12', 'test23']
            }]
        }
    }

    switch(action.type) {
        case 'CHANGE_TEST_NAME': {
            return {
               ...state.testCreator,
               testName: action.payload
            }
        }

        case 'CHANGE_TEST_DESCRIPTION': {
            return {
                ...state.testCreator,
               testDerscription: action.payload,
               
            }
        }

        default:
            return state.testCreator;
    }
}

export default upadateTestCreator