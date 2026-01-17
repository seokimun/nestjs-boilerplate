# NestJS Boilerplate

## ✨ 주요기능

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

## 🧱 기술스택

| Category      | Technology              | Version |
| ------------- | ----------------------- | ------- |
| Framework     | NestJS                  | v11.0.1 |
| Language      | TypeScript              | v5.7.3  |
| Runtime       | Node.js                 | >= 22   |
| Database      | PostgreSQL              | v16     |
| ORM           | Prisma                  | v6.19.1 |
| Auth          | Passport                | v0.7.0  |
| Auth Strategy | JWT / Google OAuth      | v11.0.2 |
| API Docs      | Swagger (OpenAPI)       | v11.2.5 |
| Validation    | Zod                     | v4.3.5  |
| Logging       | Winston                 | v1.10.2 |
| Infra         | Docker / Docker Compose | latest  |

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

## 🚀 시작하기

### 필수조건

다음 항목들이 설치 및 구성되어 있는지 확인하세요:

- Node.js **>= 22.13.0**
- Docker & Docker Compose
- npm
- Google Cloud Platform account
  - OAuth 2.0 Client ID & Secret configured
  - Authorized redirect URI set for Google OAuth

### 설치

```bash
# 1. Clone the repository
git clone https://github.com/seokimun/nestjs-boilerplate.git
cd nestjs-boilerplate

# 2. Copy environment file
cp .env.example .env

# 3. Start Docker containers
npm run container:init

# 4. Run database migrations
docker compose exec api npx prisma migrate deploy

# 5. Access the application
API: http://localhost:3001/v1
Swagger: http://localhost:3001/v1/api
```

## 🔐 환경변수 및 비밀 관리

이 프로젝트는 환경변수를 사용하여 민감한 설정 값을 관리합니다.
모든 비밀정보와 런타임 설정은 .env 파일을 통해 로드되며 **Zod**를 사용하여 시작 시 유효성을 검사합니다.

### Env File

```bash
# Server Configuration
HTTP_PORT=3000
POSTGRES_PORT=6001

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres

# Google OAuth Configuration
GOOGLE_CLIENT_ID=(your-google-client-id)
GOOGLE_CLIENT_SECRET=(your-google-client-secret)
GOOGLE_CALLBACK_URL=http://localhost:3001/v1/auth/google/callback

# Jwt Configuration
JWT_SECRET=(your-jwt-secret)
JWT_EXPIRES_IN=3600s

# Database URL
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres?schema=public
```
