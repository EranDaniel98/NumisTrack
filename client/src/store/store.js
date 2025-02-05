import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import coinReducer from './coinSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        coins: coinReducer,
    }
});

export default store;
