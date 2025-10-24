import api from "@/api/axiosConfig";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Usuario {
  id?: number;
  email: string;
  senha: string;
  role: string;
}

interface UsuarioState {
  lista: Usuario[];
  loading: boolean;
  error: string | null;
}

const initialState: UsuarioState = {
  lista: [],
  loading: false,
  error: null,
};

export const fetchUsuarios = createAsyncThunk("usuarios/fetchAll", async () => {
  const response = await api.get("http://localhost:8080/usuario");
  return response.data as Usuario[];
});

export const updateUsuario = createAsyncThunk(
  "usuarios/update",
  async (d: Usuario) => {
    const updated = await atualizarUsuario(d);
    return updated;
  }
);

export const atualizarUsuario = async (d: Usuario) => {
  if (!d.id) throw new Error("Usuário sem ID não pode ser atualizada");

  const response = await axios.put<Usuario>(
    `http://localhost:8080/usuario/${d.id}`,
    d
  );
  return response.data;
};

const usuarioSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Usuario[]>) => {
      state.lista = action.payload;
    },
    add: (state, action: PayloadAction<Usuario>) => {
      state.lista.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsuarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarios.fulfilled, (state, action: PayloadAction<Usuario[]>) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchUsuarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar usuários.";
      })
  }
});

export const { set, add } = usuarioSlice.actions;
export default usuarioSlice.reducer;