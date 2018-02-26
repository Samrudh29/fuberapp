class LogStore {

  constructor(store) {
    this.store = store;
  }

  add(log) {
    this.store.logs.push(log);
  }

  reset() {
    this.store.logs.splice(0, this.store.logs.length);
  }

  read() {
    return this.store.logs;
  }
}

module.exports = LogStore;