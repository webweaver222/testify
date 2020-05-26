import upadateTestCreator from './test-creator'
import upadateTestPublisher from './test-publisher'



const reducer = (state, action) => {

    switch (action.type) {


        case 'RESET_STORE': {
            state = undefined
        }

        default:
            return {
                testCreator: upadateTestCreator(state, action),
                testPublisher: upadateTestPublisher(state, action)
            }
    }

}

export default reducer