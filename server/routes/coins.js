const express = require('express');
const CoinController = require('../controllers/CoinController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, CoinController.getAllCoins);
router.post('/', auth, CoinController.addCoin);
router.put('/:id', auth, CoinController.updateCoin);
router.delete('/:id', auth, CoinController.deleteCoin);

module.exports = router;