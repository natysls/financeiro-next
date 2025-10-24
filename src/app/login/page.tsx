'use client';
import FloatingInput from "@/components/floatingInput";
import { login } from "@/store/authService";
import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    async function loginUser() {    
        const token = await login(username, password);
        console.log("Token recebido:", token);
        redirect("/");
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen gap-4">
            <h1>Financeiro SOP</h1>
            <form method="post" action="/auth/login" className="flex flex-col gap-2 max-w-md p-4 bg-gray-100 rounded w-full">
                <FloatingInput
                    id="username"
                    label="Nome de usuário ou e-mail"
                    value={username}
                    onChange={setUsername}
                />

                <FloatingInput
                    id="password"
                    label="Senha"
                    value={password}
                    onChange={setPassword}
                    isPassword
                />

                <button type="button" onClick={loginUser}
                    className="bg-green-600 text-white p-2 rounded">Entrar</button>
            </form>
            <div className="my-4 flex items-center w-full max-w-md">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-3 text-gray-500 text-sm font-medium">ou</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <p className="text-gray-600 text-sm">
                Não tem uma conta?{" "}
                <Link
                    href="/login/cadastro"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Cadastre-se
                </Link>
            </p>
        </div>

    );

}
