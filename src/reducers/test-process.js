const initialProcess = {
    test: {},
    current: 0,
    answers: [],
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

    const {testProcess, testProcess: {current, answers}} = state

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
                answers: new Array(action.payload.questions.length),
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

        case 'PROCESS_NEXT_QUESTION' : {
            return {
                ...testProcess,
                current: current + 1
            }
        }

        case 'PROCESS_PREV_QUESTION' : {
            return {
                ...testProcess,
                current: current === 0 ? current : current - 1
            }
        }

        case 'PROCESS_SELECT_QUESTION': {
        
            return {
                ...testProcess,
                answers: [
                    ...answers.slice(0, action.q_idx),
                    action.payload,
                    ...answers.slice(action.q_idx + 1),
                ]
            }
        }

        default:
            return testProcess;
    }
}

export default upadateTestProcess