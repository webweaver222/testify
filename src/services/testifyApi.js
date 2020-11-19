export default class TestifyApi {
  //_base = 'http://192.168.1.16:3000'
  _base = "http://localhost:3000";

  get = async url => {
  console.log(this._base + url);
    return fetch(this._base + url, {
      method: "get",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
  };

  post = async (body, url) => {
    console.log(this._base + url);
    return fetch(this._base + url, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };
}
