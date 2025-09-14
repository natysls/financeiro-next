"use client";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { addDespesa, Despesa } from "../../../store/despesaSlice";


export default function DespesaForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<Despesa>({
    numeroProtocolo: "",
    tipoDespesa: "",
    dataProtocolo: "",
    dataVencimento: "",
    credor: "",
    descricao: "",
    valor: 0,
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "valor" ? parseFloat(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Salvar no backend
      const response = await axios.post("http://localhost:8080/despesas", form, {
        headers: { "Content-Type": "application/json" },
      });

      // Salvar no Redux
      dispatch(addDespesa(response.data));
      console.log("Despesa criada:", response.data);

      // Resetar formulário
      setForm({
        numeroProtocolo: "",
        tipoDespesa: "",
        dataProtocolo: "",
        dataVencimento: "",
        credor: "",
        descricao: "",
        valor: 0,
        status: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao criar despesa:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("Erro ao criar despesa:", error.message);
      } else {
        console.error("Erro ao criar despesa:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Despesa</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md p-4 bg-gray-100 rounded">
        <input type="text" name="numeroProtocolo" placeholder="Protocolo" value={form.numeroProtocolo} onChange={handleChange} />
        <input type="text" name="tipoDespesa" placeholder="Tipo de Despesa" value={form.tipoDespesa} onChange={handleChange} />
        <input type="datetime-local" name="dataProtocolo" value={form.dataProtocolo} onChange={handleChange} />
        <input type="date" name="dataVencimento" value={form.dataVencimento} onChange={handleChange} />
        <input type="text" name="credor" placeholder="Credor" value={form.credor} onChange={handleChange} />
        <input type="text" name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
        <input type="number" step="0.01" name="valor" placeholder="Valor" value={form.valor} onChange={handleChange} />
        <input type="text" name="status" placeholder="Status" value={form.status} onChange={handleChange} />

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Criar Despesa
        </button>
      </form>
    </div>
  );
}
