import { updateQuestions } from './funcs'

const initialTest = {
    testName: '',
    testDerscription: '',
    active: 0,
    questions: [
        {
            id: 0,
            body: 'Question #1'
        }
    ]
}

const upadateTestCreator = (state, action) => {

    /*const test = () => {
            const arr = []
            for (let i = 0; i< 20; i++) {
                arr.push({
                    id: i,
                    body: `${i}`
                })
            }
            return arr
    }*/

    if (state === undefined) {
        return initialTest
    }


    const { testCreator, testCreator: { active, questions } } = state


    switch (action.type) {
        case 'CHANGE_TEST_NAME': {
            return {
                ...testCreator,
                testName: action.payload
            }
        }

        case 'CHANGE_TEST_DESCRIPTION': {
            return {
                ...testCreator,
                testDerscription: action.payload,

            }
        }

        case 'SELECT_QUESTION_NEXT': {
            return {
                ...testCreator,
                active: active + 1,
                questions: updateQuestions(questions, initialTest.questions[0], active + 1)
            }
        }

        case 'CHANGE_QUESTION_BODY': {
            const updatedQuestion = {
                ...questions[action.id],
                body: action.payload
            }
            return {
                ...testCreator,
                questions: updateQuestions(questions, updatedQuestion, action.id)
            }
        }

        case 'CHANGE_DRAG_DROP': {
            return {
                ...testCreator,
                questions: [
                    ...action.payload
                ]
            }
        }

        case 'CLICK_ACTIVE_QUESTION': {
            return {
                ...testCreator,
                active: action.payload
            }
        }

        default:
            return testCreator;
    }
}

export default upadateTestCreator