# Projeto de Exemplo: Autenticação com Google usando NextAuth.js e API Hono

Este projeto é um exemplo de autenticação de usuário com Google usando NextAuth.js em um projeto Next.js e integração com uma API Hono. 
A autenticação é realizada através do Google OAuth 2.0, e o token JWT gerado é utilizado para proteger endpoints da API Hono.

## Tecnologias Utilizadas
- Next.js: Framework React para criação de aplicações web.
- NextAuth.js: Biblioteca para autenticação em Next.js com provedores OAuth (Google, GitHub, etc.).
- Hono: Framework JavaScript/TypeScript para criação da API.
- Google OAuth 2.0: Serviço de autenticação da Google.
  
## Funcionalidades
- Login com Google usando OAuth 2.0.
- Proteção de rotas (/api/movies) na API Hono usando JWT.
- Integração de front-end (Next.js) e back-end (Hono) para garantir que apenas usuários autenticados possam acessar recursos protegidos.
