const upadateQuestion = (state, action) => {
    if (state === undefined) {
        return {
            
        }
    }

    switch(action.type) {
        case 'CHANGE_TEST_NAME': {
            return {
               ...state.testCreator,
               testName: action.payload
            }
        }


        default:
            return state.question;
    }
}

export default upadateTestCreator