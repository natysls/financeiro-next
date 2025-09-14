import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Despesa {
  id?: number;
  numeroProtocolo: string;
  tipoDespesa: string;
  dataProtocolo: string;
  dataVencimento: string;
  credor: string;
  descricao: string;
  valor: number;
  status: string;
}

interface DespesaState {
  lista: Despesa[];
  selecionada: Despesa | null;
  loading: boolean;
  error: string | null;
}

const initialState: DespesaState = {
  lista: [],
  selecionada: null,
  loading: false,
  error: null,
};

export const fetchDespesas = createAsyncThunk("despesas/fetchAll", async () => {
  const response = await axios.get("http://localhost:8080/despesa");
  return response.data as Despesa[];
});

const despesaSlice = createSlice({
  name: "despesas",
  initialState,
  reducers: {
    setDespesas: (state, action: PayloadAction<Despesa[]>) => {
      state.lista = action.payload;
    },
    addDespesa: (state, action: PayloadAction<Despesa>) => {
      state.lista.push(action.payload);
    },
    setDespesaSelecionada(state, action: PayloadAction<Despesa>) {
      state.selecionada = action.payload;
    },
    clearDespesaSelecionada(state) {
      state.selecionada = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDespesas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDespesas.fulfilled, (state, action: PayloadAction<Despesa[]>) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchDespesas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar despesas";
      });
    }
});

export const { setDespesas, addDespesa, setDespesaSelecionada, clearDespesaSelecionada } = despesaSlice.actions;
export default despesaSlice.reducer;
