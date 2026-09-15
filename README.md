# App Trilha de Aprendizado

Plataforma de aprendizagem com trilhas, avaliações, conquistas e administração de conteúdo.

## Experiência do aluno

- catálogo de trilhas;
- visão detalhada de tópicos;
- avaliações por trilha;
- painel de progresso;
- conquistas;
- gestão de conta e recuperação de acesso.

## Operação administrativa

- área de administração;
- auditoria de ações;
- gestão da experiência e dos conteúdos;
- confirmação e troca segura de e-mail.

## Stack

`React 19` · `TypeScript` · `Vite` · `Tailwind CSS` · `shadcn/ui` · `PocketBase`

## Executar localmente

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Defina `VITE_POCKETBASE_URL` no `.env` com a URL da sua instância.

## Comandos

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm preview
```

## Organização principal

```text
src/pages/TrailsList.tsx      catálogo
src/pages/TrailView.tsx       experiência da trilha
src/pages/TrailExam.tsx       avaliação
src/pages/TopicDetail.tsx     conteúdo
src/pages/Achievements.tsx    conquistas
src/pages/Admin.tsx           administração
src/pages/AdminAudit.tsx      auditoria
pocketbase/                   backend
```

## Nota

O repositório não deve carregar credenciais. Use `.env.example` como contrato de configuração e mantenha valores reais apenas no ambiente local ou no provedor de deploy.
