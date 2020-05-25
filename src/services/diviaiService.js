export default class DiviaiService {

    _base = 'http://localhost:3000'

    post = async (body, url) => {
         return fetch(this._base + url, {
            method: 'post',
            credentials: 'include',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
}