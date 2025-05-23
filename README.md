# Servi-os-prefeitura-API

## Descrição

API para gestão e controle de serviços na Prefeitura.

## Instalação

1. Clone o repositório:
   ```sh
   git clone <url-do-repositório>
   cd Prefeitura-API
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

## Configuração

1. Copie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente necessárias:
   ```sh
   cp .env.example .env
   ```

2. Edite o arquivo `.env` conforme necessário.

## Execução

Para rodar o servidor em modo desenvolvimento:
```sh
npm run dev
```
Ou para rodar normalmente:
```sh
npm start
```

O servidor será iniciado na porta definida em `APPLICATION_PORT` no arquivo `.env`.

## Estrutura do Projeto

```
.
├── server.js
├── package.json
├── .env
├── src/
│   ├── api/
│   ├── config/
│   ├── controller/
│   ├── hooks/
│   ├── micro_services/
│   ├── middleware/
│   ├── router/
│   ├── schema/
│   └── utils/
```

- **api/**: Integrações com APIs externas.
- **config/**: Arquivos de configuração (ambiente, CORS, Swagger).
- **controller/**: Lógica de negócio dividida por domínio.
- **middleware/**: Middlewares (ex: autenticação JWT).
- **router/**: Definição das rotas.
- **schema/**: Schemas de validação.
- **utils/**: Funções utilitárias.

## Endpoints Principais

- `/api/login` — Autenticação de usuários
- `/api/user` — Gerenciamento de usuários
- `/api/setor` — Gerenciamento de setores
- `/api/service` — Gerenciamento de serviços
- `/api/permissions` — Gerenciamento de permissões
- `/api/demandas` — Gerenciamento de demandas
- `/api/ft-app` — Integração com FT App

> Consulte a documentação Swagger em `/docs` (se habilitado) para detalhes completos dos endpoints.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Commit suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin minha-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT.
