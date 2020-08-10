import TestifyApi from "../src/services/testifyApi";

const service = new TestifyApi();

service.post = jest.fn();

service.post.mockResolvedValueOnce({
  ok: true,
  json: () => ({ testUrl: "testLink" })
});

export default service;
