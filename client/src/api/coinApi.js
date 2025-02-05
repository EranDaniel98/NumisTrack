import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const getCoins = async (token) => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: token }
    });
    return response.data;
};

export const addCoin = async (coinData, token) => {
    const response = await axios.post(API_URL, coinData, {
        headers: { Authorization: token }
    });
    return response.data;
};
