import { configureStore } from "@reduxjs/toolkit";
import novelReducer from "./novel/novelslice"; 

export const store = configureStore({
  reducer: {
    novel: novelReducer, 
  },
});
