export const updateQuestions = (questions, item, idx) => {

    if (idx > questions.length -1) {
        item = {
            ...item,
            id: idx,
            body: `Quesyion #${idx+1}`
        }
    }

    return [
        ...questions.slice(0, idx),
        item,
        ...questions.slice(idx+1)
    ]
}