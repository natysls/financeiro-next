import { configureStore } from "@reduxjs/toolkit";
import despesaReducer from "./despesaSlice";
import tipoDespesaReducer from "./tipoDespesaSlice";
import statusReducer from "./statusSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    despesas: despesaReducer,
    tipoDespesa: tipoDespesaReducer,
    status: statusReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
