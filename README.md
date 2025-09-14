# Financeiro SOP

Este é um sistema financeiro frontend desenvolvido para o Teste prático da Superintendência de Obras Públicas do Ceará, utilizando Next.js, Redux e Axios.

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web modernas.
- **Redux Toolkit**: Gerenciamento global de estado.
- **Axios**: Cliente HTTP para requisições à API.
- **Tailwind CSS**: Estilização rápida e responsiva.

## Instalação e Execução

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/financeiro-next.git
   cd financeiro-next
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **Prepare o projeto :**
   ```sh
   npm run build
   ```
4. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```

4. O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

## Gerenciamento de Estado

O projeto utiliza **Redux Toolkit** para gerenciar o estado global das despesas e outras entidades.

## Requisições HTTP

As requisições à API são feitas utilizando **Axios**.

## Rotas da API

- **GET `/despesa`**  
  Retorna a lista de despesas cadastradas.

- **POST `/despesa`**  
  Cadastra uma nova despesa.  
  Exemplo de payload:
  ```json
  {
    "numeroProtocolo": "12345",
    "tipoDespesa": "Material",
    "credor": "Fornecedor X",
    "descricao": "Compra de materiais",
    "valor": 1000.00
  }
  ```

## Estrutura de Pastas

- `src/app/` — Páginas e layouts do Next.js
- `src/store/` — Configuração do Redux e slices
- `src/components/` — Componentes reutilizáveis

## Observações

- Certifique-se de que a API backend esteja rodando e acessível: [http://localhost:8080](http://localhost:8080).

---

