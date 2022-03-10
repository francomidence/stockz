import { configureStore } from "@reduxjs/toolkit";
import { stockApi } from "../services/stockApi";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [stockApi.reducerPath]: stockApi.reducer,
  },
});
