import { createSlice } from '@reduxjs/toolkit';

const coinSlice = createSlice({
    name: 'coin',
    initialState: {
        collection: [],
    },
    reducers: {
        setCoins: (state, action) => {
            state.collection = action.payload;
        },
        addCoin: (state, action) => {
            state.collection.push(action.payload);
        },
        removeCoin: (state, action) => {
            state.collection = state.collection.filter(coin => coin._id !== action.payload)
        }
    }
});

export const { setCoins, addCoin, removeCoin } = coinSlice.actions;
export default coinSlice.reducer;
