import io from "socket.io-client";

class WebSocket {
  constructor(url) {
    this.url = url;
  }

  init() {
    this.socket = io(this.url);
  }
}

export default WebSocket;
