# NestJS Boilerplate

---

## ✨ 기능

- NestJS Monolithic Architecture
- API Versioning (v1)
- Prisma ORM + PostgreSQL
- Docker & Docker Compose
- JWT Authentication (@RBAC / @IsPublic)
- Google OAuth 2.0
- Swagger (OpenAPI) Documentation
- Health Check (Liveness / Readiness)
- Rate Limiting & Throttling
- Winston Logger
- Environment Validation (Zod)

---

## 🧱 기술스택

| Category      | Technology              | Version |
| ------------- | ----------------------- | ------- |
| Framework     | NestJS                  | v11.0.1 |
| Language      | TypeScript              | v5.7.3  |
| Runtime       | Node.js                 | >= 18   |
| Database      | PostgreSQL              | v16     |
| ORM           | Prisma                  | v6.19.1 |
| Auth          | Passport                | v0.7.0  |
| Auth Strategy | JWT / Google OAuth      | v11.0.2 |
| API Docs      | Swagger (OpenAPI)       | v11.2.5 |
| Validation    | Zod                     | v4.3.5  |
| Logging       | Winston                 | v1.10.2 |
| Infra         | Docker / Docker Compose | latest  |

---

## 📂 프로젝트 구조

```bash
src/
├─ api/
│ └─ v1/
│ ├─ auth/
│ │ ├─ auth.controller.ts       # Auth endpoints
│ │ ├─ auth.module.ts           # Auth module
│ │ ├─ auth.service.ts          # Auth business logic
│ │ ├─ google/
│ │ │ └─ google.strategy.ts     # Google OAuth strategy
│ │ ├─ guard/
│ │ │ ├─ jwt-auth.guard.ts      # JWT authentication guard
│ │ │ └─ roles.guard.ts         # RBAC roles guard
│ │ ├─ jwt/
│ │ │ ├─ jwt.payload.ts         # JWT payload interface
│ │ │ ├─ jwt.strategy.ts        # JWT passport strategy
│ │ │ └─ jwt.guard.ts           # JWT guard
│ │ └─ swagger/
│ │   └─ login.swagger.ts       # Swagger decorators
│ │
│ ├─ crud/
│ │ ├─ crud.controller.ts       # CRUD API endpoints
│ │ ├─ crud.module.ts           # CRUD module
│ │ ├─ crud.service.ts          # CRUD business logic
│ │ ├─ schema/
│ │ │ ├─ create-crud.schema.ts  # Zod create schema
│ │ │ └─ update-crud.schema.ts  # Zod update schema
│ │ └─ swagger/
│ │   └─ crud.swagger.ts        # Swagger decorators
│ │
│ ├─ health/
│ │ ├─ health.controller.ts     # Health check endpoints
│ │ └─ health.module.ts
│ │
│ ├─ v1.module.ts               # API v1 module
│ │
│ └─ user/
│ ├─ user.module.ts
│ └─ user.service.ts
│
├─ libs/
│ ├─ prisma/
│ │ ├─ prisma.module.ts        # Prisma global module
│ │ ├─ prisma.service.ts       # Prisma client wrapper
│ │ └─ health/
│ │ └─ prisma.health.ts        # DB health indicator
│ │
│ ├─ config/
│ │ ├─ env.schema.ts           # Zod environment schema
│ │ └─ env.ts                  # Parsed env export
│ │
│ ├─ decorators/
│ │ ├─ access-to.decorator.ts  # RBAC decorator
│ │ ├─ is-public.decorator.ts  # Public route decorator
│ │ └─ user.decorator.ts       # Current user decorator
│ │
│ ├─ middleware/
│ │ └─ logger.middleware.ts    # Request logging middleware
│ │
│ └─ pipe/
│   └─ zod-validation.pipe.ts  # Zod validation pipe
│
├─ app.module.ts               # Root application module
└─ main.ts                     # Application bootstrap

prisma/
├─ schema.prisma               # Prisma schema
└─ migrations/                 # Prisma migrations

docker-compose.yml             # Docker configuration
Dockerfile                     # Container build instructions
```

