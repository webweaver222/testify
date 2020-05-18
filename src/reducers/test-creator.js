import { updateArray , addQuestion} from './funcs'

const initialTest = {
    testName: '',
    testDerscription: '',
    active: 0,
    hoveredQuestion: null,
    questions: [
        {
            id: 0,
            body: '0',
            rightAnswer: 0,
            answers: [
                {
                    id: 0,
                    body: 'Answer #1'
                },
                {
                    id: 1,
                    body: 'Answer #2'
                },
            ]
        }
    ]
}

const upadateTestCreator = (state, action) => {

    const test = () => {
            const arr = []
            for (let i = 0; i< 49; i++) {
                arr.push({
                    id: i,
                    body: `${i}`,
                    rightAnswer: 0,
            answers: [
                {
                    id: 0,
                    body: 'Answer #1'
                },
                {
                    id: 1,
                    body: 'Answer #2'
                },
            ]
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


    const { testCreator, testCreator: { active, questions, hoveredQuestion } } = state

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

        case 'HOVER_QUESTION' : {
            const id = action.payload === hoveredQuestion ? null : action.payload
                 
             return {
                 ...testCreator,
                 hoveredQuestion: id
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
                questions: updateArray(questions, 'remove', action.payload)
            }
        }

        case 'SELECT_QUESTION_NEXT': {

            if (!questions[idx + 1]) {
                if (questions.length +1  > 50) return testCreator

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
           
            if (!questions[idx-1]) {
                return testCreator
            }
            return {
                ...testCreator,
                active: questions[idx-1].id
            }
        }

        case 'CHANGE_QUESTION_BODY': {

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

        case 'CLICK_ADD_ANSWER' : {
            const ansIdx = questions[idx].answers.length
            const newAnswerId = Math.max(...questions[idx].answers.map(a => a.id), 0) + 1

            const updatedQuestion = {
                ...questions[idx],
                answers: updateArray(questions[idx].answers, {
                    id: newAnswerId,
                    body: ''
                }, ansIdx)
            }

            return {
                ...testCreator,
                questions: updateArray(questions, updatedQuestion, idx)
            }
        }

        case 'CLICK_DELETE_ANSWER' : {
            const ansIdx = questions[idx].answers.findIndex(a=>a.id === action.payload)
           
            const selectedAns = action.payload === questions[idx].rightAnswer ? 0 : questions[idx].rightAnswer

            const updatedQuestion = {
                ...questions[idx],
                rightAnswer : selectedAns,
                answers: updateArray(questions[idx].answers, 'remove', ansIdx)
            }

            return {
                ...testCreator,
                questions: updateArray(questions, updatedQuestion, idx)
            }
        }

        case 'CLICK_SELECT_ANSWER' : {

            const updatedQuestion = {
                ...questions[idx],
                rightAnswer: action.payload
            }

            return {
                ...testCreator,
                questions: updateArray(questions, updatedQuestion, idx)
            }
        }

        case 'CLICK_ADD_QUESTION' : {
            const newId = Math.max(...questions.map(q => q.id), 0) + 1
                return {
                    ...testCreator,
                    questions: addQuestion(questions, newId),
                    active: newId
                }
        }


        default:
            return testCreator;
    }
}

export default upadateTestCreator