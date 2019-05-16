class Client {
  constructor(address) {
    this.address = address;
    this.open = false;

    this.messageListeners = [];

    this.connect(this.address);
  }

  connect(address) {
    this.address = address;
    if (this.address === "") return;

    this.socket = new WebSocket(`ws://${this.address}`);

    this.socket.onopen = () => (this.open = true);

    this.socket.onmessage = event => {
      // console.log(event);
      let parsedMsg;
      try {
        parsedMsg = JSON.parse(event.data);
      } catch (e) {
        parsedMsg = event.data;
      }

      this.messageListeners.forEach(e => {
        e["func"].call(e["thisval"], parsedMsg, event.data);
      });
    };

    this.socket.onclose = () => (this.open = false);
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

  removeMessageListener(func) {
    const index = this.messageListeners.indexOf(func);
    if (index > -1) this.messageListeners.splice(index, 1);

    // this.messageListeners = this.messageListeners.filter(e => e !== func)
  }
}

var SocketClient = new Client("");

export { SocketClient as default };
