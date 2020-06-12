import upadateTestCreator from './test-creator'
import upadateTestPublisher from './test-publisher'
import upadateTestProcess from './test-process'
import updateTimer from './timer'



const reducer = (state, action) => {

    switch (action.type) {


        case 'RESET_STORE': {
            state = undefined
        }

        default:
            return {
                testCreator: upadateTestCreator(state, action),
                testPublisher: upadateTestPublisher(state, action),
                testProcess: upadateTestProcess(state, action),
                timer: updateTimer(state, action)
            }
    }

}

export default reducer