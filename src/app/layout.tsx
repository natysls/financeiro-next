import "./globals.css";
import { Header } from "../components/header";
import { Metadata } from "next";
import ReduxProvider from "./ReduxProvider";
import Notification from "../components/notification";

export const metadata: Metadata = {
  title: "Financeiro SOP",
  description: "O sistema financeiro da Superintendência de Obras Públicas do Ceará",
  icons: {
    icon: "https://www.ceara.gov.br/wp-content/themes/ceara2017/favicon.ico",
  },
  openGraph: {
    title: "Financeiro SOP",
    description: "O sistema financeiro da Superintendência de Obras Públicas do Ceará",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <ReduxProvider>
          <Header />
          <Notification />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
