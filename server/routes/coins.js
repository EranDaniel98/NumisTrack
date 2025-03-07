const express = require('express');
const CoinController = require('../controllers/CoinController');
const auth = require('../middleware/auth');
const { validateCoin } = require('../validation/coinValidation');

const router = express.Router();

router.get('/', auth, CoinController.getAllCoins);
router.post('/', auth, validateCoin, CoinController.addCoin);
router.put('/:id', auth, validateCoin, CoinController.updateCoin);
router.delete('/:id', auth, CoinController.deleteCoin);

module.exports = router;