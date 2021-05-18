import io from "socket.io-client";

class WebSocket {
  constructor(origin, options) {
    this.origin = origin;
    this.options = options;
  }

  init() {
    this.socket = io(this.origin, this.options);
  }
}

export default WebSocket;
