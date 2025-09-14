"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchDespesas } from "../../store/despesaSlice";
import Link from "next/link";

export default function DespesasPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { lista, loading, error } = useSelector((state: RootState) => state.despesas);
  
  useEffect(() => {
    dispatch(fetchDespesas());
  }, [dispatch]);

  return (
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Lista de Despesas</h2>
          <Link
            href="/despesas/cadastro"
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block text-center"
          >
            Criar Despesa
          </Link>
        </div>

        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">Erro: {error}</p>}

        {lista.length === 0 && !loading ? (
          <p>Nenhuma despesa cadastrada.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Número Protocolo</th>
                <th className="border px-4 py-2">Tipo</th>
                <th className="border px-4 py-2">Credor</th>
                <th className="border px-4 py-2">Descrição</th>
                <th className="border px-4 py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((d) => (
                <tr key={d.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{d.id}</td>
                  <td className="border px-4 py-2">{d.numeroProtocolo}</td>
                  <td className="border px-4 py-2">{d.tipoDespesa}</td>
                  <td className="border px-4 py-2">{d.credor || "-"}</td>
                  <td className="border px-4 py-2">{d.descricao || "-"}</td>
                  <td className="border px-4 py-2">
                    {d.valor ? `R$ ${d.valor.toFixed(2)}` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}