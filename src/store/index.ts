import { configureStore } from "@reduxjs/toolkit";
import despesaReducer from "./despesaSlice";
import tipoDespesaReducer from "./tipoDespesaSlice";
import statusReducer from "./statusSlice";
import notificationReducer from "./notificationSlice";
import usuarioReducer from "./usuarioSlice";
import roleReducer from "./rolesSlice";

export const store = configureStore({
  reducer: {
    despesas: despesaReducer,
    tipoDespesa: tipoDespesaReducer,
    status: statusReducer,
    notification: notificationReducer,
    usuarios: usuarioReducer,
    roles: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
