export default class SocketClient {
  constructor(address) {
    this.address = address;
    this.socket = new WebSocket(`ws://${this.address}`);

    this.open = false;

    this.messageListeners = [];

    this.socket.onopen = () => {
      this.open = true;
    };

    this.socket.onmessage = event => {
      console.log(event);

      this.messageListeners.forEach(e => {
        e["func"].call(e["thisVal"], event.data);
      });
    };

    this.socket.onclose = () => {
      this.open = false;
    };
  }

  send(payload) {
    if (!this.open) return false;

    this.socket.send(payload);

    return true;
  }

  close() {
    this.socket.close();
    this.open = false;
  }

  addMessageListener(func, thisVal = null) {
    this.messageListeners.push({ func: func, thisVal: thisVal });
  }
}
