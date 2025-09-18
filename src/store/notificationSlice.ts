import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: number;
  type: "success" | "error" | "info";
  message: string;
}

interface NotificationState {
  list: Notification[];
}

const initialState: NotificationState = {
  list: [],
};

let nextId = 1;

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<{ type: "success" | "error" | "info"; message: string }>
    ) => {
      state.list.push({ id: nextId++, ...action.payload });
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
