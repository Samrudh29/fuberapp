class UserStore {

  constructor(store) {
    this.store = store;
  }

  createOrUpdate(user) {
    this.store.users[user.id] = user;
    return user;
  }

  read() {
    return this.store.users;
  }

  getById() {
    if (!this.store.users[id])
      throw 'No user available with id ' + id;
    return this.store.users[id];
  }

  delete(id) {
    if (!this.store.users[id])
      throw 'No user available with id ' + id;
    delete this.store.users[id];
  }
}

module.exports = UserStore;