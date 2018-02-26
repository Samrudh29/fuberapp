var TaxiStore = require('./TaxiStore');
var UserStore = require('./UserStore');
var LogStore = require('./LogStore');

const store = {
  taxis: {},
  users: {},
  logs: []
};

module.exports = {
  taxi: new TaxiStore(store),
  user: new UserStore(store),
  log: new LogStore(store)
};