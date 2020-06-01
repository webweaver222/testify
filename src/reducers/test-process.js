const initialProcess = {
    test: {},
    studentName: '',
    started: false,
    fetching: false,
    error: null,
    nameError: false
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

        case 'CHANGE_STUDENT_NAME': {
            return {
                ...testProcess,
                studentName: action.payload
            }
        }

        case 'START_TEST_PROCESS' : {
            return {
                ...testProcess,
                started: true,
                nameError: false
            }
        }

        case 'START_TEST_FAIL' : {
            return {
                ...testProcess,
               nameError: true
            }
        }


        default:
            return testProcess;
    }
}

export default upadateTestProcess