const Coin = require('../models/coin');
const validateCoin = require('../validation/coinValidation');

class CoinController {
    // Fetch all coins for a user
    static async getAllCoins(req, res) {
        try {
            const coins = await Coin.find({ userId: req.user.id });
            return res.status(200).json(coins);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching coins.', error });
        }
    }

    static async addCoin(req, res) {
        const { error } = validateCoin(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            const newCoin = new Coin({
                userId: req.user.id,
                ...req.body,
            });

            await newCoin.save();
            return res.status(201).json({ message: 'Coin added successfully.', coin: newCoin });
        } catch (error) {
            return res.status(500).json({ message: 'Error adding coin.', error });
        }
    }

    // Update an existing coin
    static async updateCoin(req, res) {
        try {
            const updatedCoin = await Coin.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            if (!updatedCoin) {
                return res.status(404).json({ message: 'Coin not found.' });
            }
            return res.status(200).json({ message: 'Coin updated successfully.', coin: updatedCoin });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating coin.', error });
        }
    }

    // Delete a coin
    static async deleteCoin(req, res) {
        try {
            const deletedCoin = await Coin.findByIdAndDelete(req.params.id);
            if (!deletedCoin) {
                return res.status(404).json({ message: 'Coin not found.' });
            }
            return res.status(200).json({ message: 'Coin deleted successfully.' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting coin.', error });
        }
    }
}

module.exports = CoinController;
