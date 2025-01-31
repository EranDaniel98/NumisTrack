import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice'
import coinReducer from './coinSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        coin: coinReducer,
    }
});

export default store;
