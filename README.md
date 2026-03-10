# Restaurant SaaS MVP

## 1) Full Project Folder Structure

```text
projectMasterPiece/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── sockets/
│   ├── store/
│   ├── types/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
├── package.json
└── README.md
```

## Run on localhost

1. Start PostgreSQL:

```bash
npm run db:up
```

2. Create env files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Install dependencies:

```bash
npm run setup
```

4. Initialize Prisma:

```bash
npm run backend:prisma:generate
npm run backend:prisma:migrate
npm run backend:prisma:seed
```

5. Start backend and frontend:

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend health: http://localhost:4000/health
- Backend API base: http://localhost:4000/api

## Included deliverables

- Prisma schema
- Backend server + API routes + socket server
- Frontend project + menu + kitchen dashboard + admin + QR generator
- Example seed data
