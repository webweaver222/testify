export default class DiviaiService {

    _base = '...'

    post = (test) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject({
                ...test,
                resault: 'Test saved'
            }), 2000)
        })
    }
}