'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // ou buscar do cookie
    if (!token) {
      router.replace("/login"); // redireciona só se não estiver logado
    } else {
      router.replace("/"); // ou outra página inicial pós-login
    }
  }, [router]);

  return <div>Bem vindo!</div>;
}