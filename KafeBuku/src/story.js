
import { configureStore } from '@reduxjs/toolkit';
import novelReducer from './novel/novelslice'; 

const store = configureStore({
  reducer: {
    novel: novelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export default store;
