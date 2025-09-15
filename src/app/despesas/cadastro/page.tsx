"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addDespesa, Despesa, clearDespesaSelecionada, updateDespesa } from "../../../store/despesaSlice";
import { fetchTiposDespesa } from "../../../store/tipoDespesaSlice";
import { fetchStatus } from "../../../store/statusSlice";
import { useRouter } from "next/navigation";

export default function DespesaForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { list: tipos } = useSelector((state: RootState) => state.tipoDespesa);
  const { list: status } = useSelector((state: RootState) => state.status);
  const router = useRouter();

  const despesaSelecionada = useSelector(
    (state: RootState) => state.despesas.selecionada
  );

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

  useEffect(() => {
    if (despesaSelecionada) {
      setForm(despesaSelecionada);
    }
    return () => {
      dispatch(clearDespesaSelecionada()); // limpa ao sair da página
    };
  }, [despesaSelecionada, dispatch]);

  useEffect(() => {
    dispatch(fetchTiposDespesa());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStatus());
  }, [dispatch]);

  function formatNumeroProtocolo(value: string) {
    // Remove tudo que não for número
    value = value.replace(/\D/g, "");
    // Aplica a máscara
    value = value.replace(/^(\d{0,5})(\d{0,6})(\d{0,4})(\d{0,2}).*/, function (_, a, b, c, d) {
      let out = "";
      if (a) out += a;
      if (b) out += "." + b;
      if (c) out += "/" + c;
      if (d) out += "-" + d;
      return out;
    });
    return value;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "numeroProtocolo") {
      setForm({ ...form, [name]: formatNumeroProtocolo(value) });
    } else {
      setForm({ ...form, [name]: name === "valor" ? parseFloat(value) : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.id) {
      await dispatch(updateDespesa(form));
    } else {
      try {
        // Salvar no backend
        const response = await axios.post("http://localhost:8080/despesa", form, {
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
    }    
    router.push("/despesas");
  };

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Cadastro de Despesa</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md p-4 bg-gray-100 rounded">
          <div className="flex flex-col mb-2">
            <label htmlFor="numeroProtocolo" className="font-semibold mb-1">
              Número do Protocolo
            </label>
            <input
              type="text"
              id="numeroProtocolo"
              name="numeroProtocolo"
              placeholder="#####.######/####-##"
              value={form.numeroProtocolo}
              onChange={handleChange}
              maxLength={22}
              className="p-2 border rounded"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="tipoDespesa" className="font-semibold mb-1">
              Tipo da Despesa
            </label>
            <select
              id="tipoDespesa"
              name="tipoDespesa"
              value={form.tipoDespesa}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Selecione...</option>
              {tipos.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="dataProtocolo" className="font-semibold mb-1">
              Data do Protocolo
            </label>
            <input type="datetime-local" name="dataProtocolo"
              value={form.dataProtocolo} onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="dataVencimento" className="font-semibold mb-1">
              Data do Vencimento
            </label>
            <input type="date" name="dataVencimento"
              value={form.dataVencimento} onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="credor" className="font-semibold mb-1">
              Credor
            </label>
            <input type="text" name="credor" placeholder="Credor"
              value={form.credor} onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="descricao" className="font-semibold mb-1">
              Descrição
            </label>
            <input type="text" name="descricao" placeholder="Descrição"
              value={form.descricao} onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="valor" className="font-semibold mb-1">
              Valor da Despesa
            </label>
            <input type="number" step="0.01" name="valor"
              placeholder="Valor" value={form.valor}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="status" className="font-semibold mb-1">
              Status da Despesa
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Selecione...</option>
              {status.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/despesas"
              className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block text-center"
            >
              Voltar
            </Link>
            <button type="submit" className="bg-green-600 text-white p-2 rounded">
              Salvar Despesa
            </button>
          </div>

        </form>
      </div>
    );
  }
