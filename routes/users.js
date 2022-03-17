const express = require('express');

const router = express.Router();

// Parámetros tipo query
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay parámetros');
  }
})

module.exports = router;
