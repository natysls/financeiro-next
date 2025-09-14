import { configureStore } from "@reduxjs/toolkit";
import despesaReducer from "./despesaSlice";
import tipoDespesaReducer from "./tipoDespesaSlice";
import statusReducer from "./statusSlice";

export const store = configureStore({
  reducer: {
    despesas: despesaReducer,
    tipoDespesa: tipoDespesaReducer,
    status: statusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
