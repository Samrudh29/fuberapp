class TaxiStore {

  constructor(store) {
    this.store = store;
  }

  createOrUpdate(taxi) {
    var editTaxi = this.store.taxis[taxi.id];
    if (!editTaxi)
      editTaxi = taxi;
    else {
      editTaxi.pink = taxi.pink;
      editTaxi.logitude = taxi.logitude;
      editTaxi.latitude = taxi.latitude;
    }
    this.store.taxis[taxi.id] = editTaxi;
    return editTaxi;
  }

  read() {
    return this.store.taxis;
  }

  getById() {
    if (!this.store.taxis[id])
      throw 'No taxi available with id ' + id;
    return this.store.taxis[id];
  }

  delete(id) {
    if (!this.store.taxis[id])
      throw 'No taxi available with id ' + id;
    delete this.store.taxis[id];
  }
}

module.exports = TaxiStore;