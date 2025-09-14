import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface TipoDespesa {
  value: string;
  label: string;
}

interface TipoDespesaState {
  list: TipoDespesa[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: TipoDespesaState = {
  list: [],
  loading: false,
  error: null,
};

// Thunk para buscar os tipos no backend
export const fetchTiposDespesa = createAsyncThunk(
  "tipoDespesa/fetchTipos",
  async () => {
    const response = await axios.get("http://localhost:8080/tipos_despesa");
    return response.data as TipoDespesa[];
  }
);

const tipoDespesaSlice = createSlice({
  name: "tipoDespesa",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTiposDespesa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTiposDespesa.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTiposDespesa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar tipos de despesa";
      });
  },
});

export default tipoDespesaSlice.reducer;
