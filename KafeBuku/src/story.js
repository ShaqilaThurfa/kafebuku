
import { configureStore } from '@reduxjs/toolkit';
import novelReducer from './novel/novelslice'; 

const store = configureStore({
  reducer: {
    novel: novelReducer,
  },
});

export default store;
