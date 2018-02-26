const express = require('express');
const router = express.Router();

const store = require('./store/index');

router.post('/taxi', (req, res) => {
  const taxi = req.body;
  res.setHeader('Content-Type', 'application/json');
  res.json(store.taxi.createOrUpdate(taxi));
});

router.get('/taxi', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(store.taxi.read());
});

router.delete('/taxi/:id', (req, res) => {
  store.taxi.delete(req.params.id);
  res.setHeader('Content-Type', 'application/json');
  res.json(store.taxi.read());
});

module.exports = router;