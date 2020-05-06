import { updateArray , addQuestion} from './funcs'

const initialTest = {
    testName: '',
    testDerscription: '',
    active: 0,
    questions: [
        {
            id: 0,
            body: '0',
            answers: [
                {
                    id: 0,
                    body: 'ans1'
                },
                {
                    id: 1,
                    body: 'ans2'
                },
            ]
        }
    ]
}

const upadateTestCreator = (state, action) => {

    const test = () => {
            const arr = []
            for (let i = 0; i< 20; i++) {
                arr.push({
                    id: i,
                    body: `${i}`
                })
            }
            return arr
    }

    if (state === undefined) {
        return {
            ...initialTest,
            //questions: test()
        }
    }


    const { testCreator, testCreator: { active, questions } } = state

    const idx = questions.findIndex(q => q.id === active)

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
                active: questions[action.payload].id
            }
        }

        case 'CLICK_DELETE_QUESTION' : {

            return {
                ...testCreator,
                active: questions[action.payload - 1].id,
                questions: updateArray(questions, null, action.payload)
            }
        }

        case 'SELECT_QUESTION_NEXT': {
            //const idx = questions.findIndex(q => q.id === active)

            if (!questions[idx + 1]) {
                const newId = Math.max(...questions.map(q => q.id), 0) + 1
                return {
                    ...testCreator,
                    questions: addQuestion(questions, newId),
                    active: newId
                }
            }

            return {
                ...testCreator,
                active: questions[idx+1].id
            }
        }

        case 'SELECT_QUESTION_PREV': {
            //const idx = questions.findIndex(q => q.id === active)
            if (!questions[idx-1]) {
                return testCreator
            }
            return {
                ...testCreator,
                active: questions[idx-1].id
            }
        }

        case 'CHANGE_QUESTION_BODY': {
            //const idx = questions.findIndex(q => q.id === active)

            const updatedQuestion = {
                ...questions[idx],
                body: action.payload
            }
            return {
                ...testCreator,
                questions: updateArray(questions, updatedQuestion, idx)
            }
        }

        case 'CHANGE_ANSWER_BODY': {
            //const idx = questions.findIndex(q => q.id === active)
            const ansIdx = questions[idx].answers.findIndex(a => a.id === action.id)


            const updatedAnswer = {
                ...questions[idx].answers[ansIdx],
                body: action.payload
            }

            const updatedQuestion = {
                ...questions[idx],
                answers: updateArray(questions[idx].answers, updatedAnswer, ansIdx)
            }

            return {
                ...testCreator,
                questions: updateArray(questions, updatedQuestion, idx)
            }
        }


       

        default:
            return testCreator;
    }
}

export default upadateTestCreator