const initialProcess = {
    test: {},
    fetching: false,
    error: null
}



const upadateTestProcess = (state, action) => {

    if (state === undefined) {
        return initialProcess;
    }

    const {testProcess} = state

    switch (action.type) {
       case 'FETCH_TEST_START': {
            return {
                ...testProcess,
                fetching: true
            }
        }

        case 'FETCH_TEST_SUCCESS': {
            return {
                ...testProcess,
                test: action.payload,
                fetching: false
            }
        }

        case 'FETCH_TEST_FAIL': {
            return {
                ...testProcess,
                error: action.payload,
                fetching: false
            }
        }

        default:
            return testProcess;
    }
}

export default upadateTestProcess