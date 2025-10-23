import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Role {
  value: string;
  label: string;
}

interface RoleState {
  list: Role[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: RoleState = {
  list: [],
  loading: false,
  error: null,
};

// Thunk para buscar as roles no backend
export const fetchRole = createAsyncThunk(
  "role/fetchTipos",
  async () => {
    const response = await axios.get("http://localhost:8080/roles-usuario");
    return response.data as Role[];
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar roles de usuário";
      });
  },
});

export default roleSlice.reducer;
