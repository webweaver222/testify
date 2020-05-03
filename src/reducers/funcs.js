export const updateQuestions = (questions, item, idx) => {
    

    if (item === null) {
        return [
            ...questions.slice(0, idx),
            ...questions.slice(idx+1)
        ]
    }


    return [
        ...questions.slice(0, idx),
        item,
        ...questions.slice(idx+1)
    ]
}



export const addQuestion = (questions, newId) => {
   
    return [
        ...questions,
        {
            id: newId,
            body: `${newId}`
        }
    ]
}