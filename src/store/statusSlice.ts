import api from "@/api/axiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Status {
  value: string;
  label: string;
}

interface StatusState {
  list: Status[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: StatusState = {
  list: [],
  loading: false,
  error: null,
};

// Thunk para buscar os tipos no backend
export const fetchStatus = createAsyncThunk(
  "status/fetchTipos",
  async () => {
    const response = await api.get("http://localhost:8080/status");
    return response.data as Status[];
  }
);

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar tipos de despesa";
      });
  },
});

export default statusSlice.reducer;
