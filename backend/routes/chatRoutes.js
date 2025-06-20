const express = require('express');
const router = express.Router();

// TEMPORARY route to test
router.post('/generate', (req, res) => {
  res.json({ message: "This is a test response from backend!" });
});

module.exports = router;
