import { configureStore } from "@reduxjs/toolkit";
import despesaReducer from "./despesaSlice";

export const store = configureStore({
  reducer: {
    despesas: despesaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
