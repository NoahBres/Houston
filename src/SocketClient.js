class Client {
  constructor(address) {
    this.address = address;
    this.open = false;
    this.state = "disconnected"; // Disconnected, connecting, or connected

    this.messageListeners = [];
    this.openCloseListeners = [];
    this.stateChangeListeners = [];

    this.connect(this.address);
  }

  connect(address) {
    this.address = address || this.address;
    if (this.address === "") return;

    this.setState("connecting");

    this.socket = new WebSocket(`ws://${this.address}`);

    this.socket.onopen = () => {
      this.open = true;
      this.setState("connected");

      this.openCloseListeners.forEach(e => {
        e["func"].call(e["thisVal"], this.open);
      });
    };

    this.socket.onmessage = event => {
      // console.log(event);
      let parsedMsg;
      try {
        parsedMsg = JSON.parse(event.data);
      } catch (e) {
        parsedMsg = event.data;
      }

      this.messageListeners.forEach(e => {
        e["func"].call(e["thisVal"], parsedMsg, event.data);
      });
    };

    this.socket.onclose = () => {
      this.open = false;
      this.setState("disconnected");

      this.openCloseListeners.forEach(e => {
        e["func"].call(e["thisVal"], this.open);
      });

      // setTimeout(() => this.connect(this.address), 1000);
    };

    this.socket.onerror = () => {
      this.setState("disconnected");

      // setTimeout(() => this.connect(this.address), 1000);
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

    this.openCloseListeners.forEach(e => {
      e["func"].call(e["thisVal"], this.open);
    });
  }

  setState(state) {
    this.state = state;

    this.stateChangeListeners.forEach(e => {
      e["func"].call(e["thisVal"], this.state);
    });
  }

  addMessageListener(func, thisVal = null) {
    this.messageListeners.push({ func, thisVal });
  }

  removeMessageListener(func) {
    const index = this.messageListeners.indexOf(func);
    if (index > -1) this.messageListeners.splice(index, 1);

    // this.messageListeners = this.messageListeners.filter(e => e !== func)
  }

  addOpenCloseListener(func, thisVal = null) {
    this.openCloseListeners.push({ func, thisVal });
  }

  removeOpenCloseListener(func) {
    const index = this.openCloseListeners.indexOf(func);
    if (index > -1) this.openCloseListeners.splice(index, 1);
  }

  addStateChangeListener(func, thisVal = null) {
    this.stateChangeListeners.push({ func, thisVal });
  }

  removeStateChangeListener(func) {
    const index = this.stateChangeListeners.indexOf(func);
    if (index > -1) this.stateChangeListeners.splice(index, 1);
  }
}

var SocketClient = new Client("");

export { SocketClient as default };
