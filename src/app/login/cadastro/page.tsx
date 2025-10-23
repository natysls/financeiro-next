'use client';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { Usuario, add, updateUsuario } from "@/store/usuarioSlice";
import { addNotification } from "../../../store/notificationSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import FloatingInput from "@/components/floatingInput";

export default function CadastroUsuarioPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { lista, loading, error } = useSelector((state: RootState) => state.usuarios);
    const [form, setForm] = useState<Usuario>({
        email: "",
        senha: "",
        role: "",
    });
    const router = useRouter();
    const { list: roles } = useSelector((state: RootState) => state.roles);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.id) {
            await dispatch(updateUsuario(form));
            dispatch(addNotification({ message: "Usuário atualizado com sucesso!", type: "success" }));
        } else {
            try {
                // Salvar no backend
                const response = await axios.post("http://localhost:8080/usuario", form, {
                    headers: { "Content-Type": "application/json" },
                });

                // Salvar no Redux
                dispatch(add(response.data));
                dispatch(addNotification({ message: "Usuário atualizada com sucesso!", type: "success" }));

                // Resetar formulário
                setForm({
                    email: "",
                    senha: "",
                    role: "",
                });
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error("Erro ao criar usuário:", error.response?.data || error.message);
                }
                dispatch(addNotification({ message: "Erro ao salvar usuário!", type: "error" }));
            }
        }
        router.push("/login");
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen gap-4">
            <h1> Cadastro de Usuários</h1>
            <form onSubmit={handleSubmit} method="post" 
                action="/auth/cadastrar"
                className="flex flex-col gap-2 max-w-md p-4 bg-gray-100 rounded w-full">
                
                <div className="flex flex-col mb-2 gap-2">
                    <FloatingInput
                        id="username"
                        label="Nome de usuário ou e-mail"
                        value={form.email}
                        onChange={(value) => setForm({ ...form, email: value })}
                    />
                    <FloatingInput
                        id="password"
                        label="Senha"
                        value={form.senha}
                        onChange={(value) => setForm({ ...form, senha: value })}
                        isPassword
                    />
                    <select
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Selecione...</option>
                        {roles.map((st) => (
                        <option key={st.value} value={st.value}>
                            {st.label}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <Link
                        href="/login"
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block text-center"
                    >
                        Voltar
                    </Link>
                    <button type="submit" className="bg-green-600 text-white p-2 rounded">
                        Salvar Usuário
                    </button>
                </div>
            </form>

            {lista.map((user) => (
                <div key={user.id} className="card">
                    <div>
                        <p>Email: <span>{user.email}</span></p>
                        <p>Senha: <span>{user.senha}</span></p>
                        <p>Role: <span>{user.role}</span></p>
                    </div>
                </div>
            ))}
        </div>
    );
}

