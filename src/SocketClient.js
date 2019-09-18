const SocketState = Object.freeze({
  DISCONNECTED: Symbol("disconnected"),
  CONNECTED: Symbol("connected"),
  CONNECTING: Symbol("connecting")
});

class Client {
  constructor(address) {
    this.address = address;
    this.open = false;
    this.state = SocketState.DISCONNECTED; // Disconnected, connecting, or connected

    this.messageListeners = [];
    this.openCloseListeners = [];
    this.stateChangeListeners = [];

    this.connect(this.address);
  }

  connect(address) {
    this.address = address || this.address;
    if (this.address === "") return;

    this.setState(SocketState.CONNECTING);

    this.socket = new WebSocket(`ws://${this.address}`);

    this.socket.onopen = () => {
      this.open = true;
      this.setState(SocketState.CONNECTED);

      this.openCloseListeners.forEach(e => {
        e.func.call(e.thisVal, this.open);
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
        e.func.call(e.thisVal, parsedMsg, event.data);
      });
    };

    this.socket.onclose = () => {
      this.open = false;
      this.setState(SocketState.DISCONNECTED);

      this.openCloseListeners.forEach(e => {
        e.func.call(e.thisVal, this.open);
      });

      // setTimeout(() => this.connect(this.address), 1000);
    };

    this.socket.onerror = () => {
      this.setState(SocketState.DISCONNECTED);

      // setTimeout(() => this.connect(this.address), 1000);
    };
  }

  send(payload) {
    if (!this.open) return false;

    this.socket.send(payload);

    return true;
  }

  sendMessage(msg, tag, time = new Date()) {
    function formatDate(date) {
      const year = date.getFullYear();
      const month = `${date.getMonth() < 10 ? "0" : ""}${date.getMonth()}`;
      const day = date.getDate();

      const hour = date.getHours();
      const minute = date.getMinutes();
      const seconds = date.getSeconds();
      const milliseconds = date.getMilliseconds();

      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}.${milliseconds}`;
    }

    return this.send(JSON.stringify({ msg, tag, time: formatDate(time) }));
  }

  close() {
    this.socket.close();
    this.open = false;

    this.openCloseListeners.forEach(e => {
      e.func.call(e.thisVal, this.open);
    });
  }

  setState(state) {
    this.state = state;

    this.stateChangeListeners.forEach(e => {
      e.func.call(e.thisVal, this.state);
    });
  }

  addMessageListener(func, thisVal = null) {
    this.messageListeners.push({ func, thisVal });
  }

  removeMessageListener(func) {
    let index = -1;
    this.messageListeners.forEach((e, i) => {
      if (e.func === func) index = i;
    });
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

const SocketClient = new Client("");

export { SocketClient as default, SocketState };
