"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login/cadastro" || pathname === "/login";
  
  return (
    <header className="w-full p-4 bg-green-600 text-white">
      <div className="flex items-center justify-between">
        <div className="relative w-45 h-15">
          <Image
            src="https://www.ceara.gov.br/wp-content/uploads/2023/10/logotipo-governo-do-ceara-2023.svg"
            alt="Logo"
            className="mr-4"
            fill style={{ objectFit: 'contain' }} 
            priority
          />
        </div>
        <div className="text-lg font-bold">
          Financeiro SOP
        </div>
      </div>
      {!isLoginPage &&
        <nav>
          <ul className="flex space-x-4">
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/despesas'>Despesas</Link></li>
          </ul>
        </nav>
  }
    </header>
  );
}