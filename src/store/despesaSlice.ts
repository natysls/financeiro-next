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

export const updateDespesa = createAsyncThunk(
  "despesas/update",
  async (d: Despesa) => {
    const updated = await atualizarDespesa(d);
    return updated;
  }
);

export const atualizarDespesa = async (d: Despesa) => {
  if (!d.id) throw new Error("Despesa sem ID não pode ser atualizada");

  const response = await axios.put<Despesa>(
    `http://localhost:8080/despesa/${d.id}`,
    d
  );
  return response.data;
};

export const deleteDespesa = createAsyncThunk(
  "despesas/delete",
  async (id: number) => { 
    await axios.delete(`http://localhost:8080/despesa/${id}`);
    return id;
  }
);

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
      })
      .addCase(updateDespesa.fulfilled, (state, action) => {
        const index = state.lista.findIndex((d) => d.id === action.payload.id);
        if (index >= 0) state.lista[index] = action.payload; // atualiza lista
        if (state.selecionada?.id === action.payload.id) {
          state.selecionada = action.payload; // atualiza despesa selecionada
        }
      })
      .addCase(deleteDespesa.fulfilled, (state, action: PayloadAction<number>) => {
        state.lista = state.lista.filter((d) => d.id !== action.payload);
        if (state.selecionada?.id === action.payload) {
          state.selecionada = null; // limpa se a despesa deletada estava selecionada
        }
      });
  }
});

export const { setDespesas, addDespesa, setDespesaSelecionada, clearDespesaSelecionada } = despesaSlice.actions;
export default despesaSlice.reducer;
