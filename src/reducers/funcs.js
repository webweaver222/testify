export const updateArray = (items, newItem ,idx) => {


    if (newItem === null) {
        return [
            ...items.slice(0, idx),
            ...items.slice(idx+1)
        ]
    }

    return [
        ...items.slice(0, idx),
        newItem,
        ...items.slice(idx+1)
    ]
}



export const addQuestion = (questions, newId) => {
   
    return [
        ...questions,
        {
            id: newId,
            body: `${newId}`,
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