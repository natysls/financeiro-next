import api from "@/api/axiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchRole = createAsyncThunk(
  "role/fetchRoles",
  async () => {
    const response = await api.get("http://localhost:8080/roles_usuario");
    console.log("Resposta:", response.data);
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
