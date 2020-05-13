import upadateTestCreator from './test-creator'
import upadateTestPublisher from './test-publisher'



const reducer = (state , action) => {
    
   return {
       testCreator: upadateTestCreator(state, action),
       testPublisher: upadateTestPublisher(state, action)
   }
   
}

export default reducer