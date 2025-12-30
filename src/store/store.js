import {createSlice} from '@reduxjs/toolkit';
import authSlice from 'authSlice';

const store = createSlice({
    name: 'store',
    reducers: {
        auth: authSlice
    }
});

export default store  