import upadateTestCreator from './test-creator'


const reducer = (state , action) => {
    
   return {
       testCreator: upadateTestCreator(state, action)
   }
   
}

export default reducer