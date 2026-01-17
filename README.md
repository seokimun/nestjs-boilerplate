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

## 🐳 Docker 설정

이 프로젝트는 로컬 개발 및 테스트를 위해 **Docker Compose**를 사용하여 완전히 컨테이너화되었습니다.

### Docker Compose 서비스

해당 프로젝트에는 다음과 같은 서비스가 포함됩니다:

- **PostgreSQL 16**
  - 관계형 데이트베이스
  - Docker 불륨을 통해 데이터가 영구 저장
- **NestJS API**
  - 애플리케이션 서버
  - 개발 환경에서 핫리로드 기능 활성화
  - 내부 Docker 네트워크를 통해 PostgreSQL에 연결

### Docker Commands

```bash
# Start all required services (PostgreSQL + API):
npm run container:init
# or
docker-compose up --build

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Remove volumes (⚠️ deletes data)
docker-compose down -v

# Access API container shell
docker-compose exec api sh
```

## 🗄️ Database & Migrations

이 프로젝트는 데이터베이스 접근 및 스키마 관리를 위해 Prisma ORM이 포함된 PostgreSQL을 사용합니다.

### Prisma Commands

```bash
# Create and apply a new migration (development)
npx prisma migrate dev --name init

# Apply pending migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

## 🔐 인증 & 인가

해당 프로젝트는 **Passport**, **JWT** 및 **RBAC**를 기반으로 하는 구조화된 인증 및 권한 부여 시스템을 제공합니다.

### 인증전략

다음과 같은 인증 전략이 지원됩니다:

| Strategy           | Purpose        | Usage             |
| ------------------ | -------------- | ----------------- |
| Google OAuth       | 외부 신원 인증 | `/v1/auth/google` |
| Access Token (JWT) | API 보호       | 모든 경로 보호    |

### Role-Based Access Control (RBAC)

이 시스템은 다음과 같은 역할을 사용하여 역할 기반 권한 부여를 지원합니다:

```ts
enum Role {
  ADMIN = 'ADMIN',
  STANDARD = 'STANDARD',
}
```

### Decorators

인증 및 권한 부여에 일반적으로 사용되는 데코레이터:

| Decorator           | Purpose        | Example           |
| ------------------- | -------------- | ----------------- |
| `@Public()`         | 인증 절차 무시 | Google OAuth      |
| `@RBAC(Role.ADMIN)` | 특정 역할 제한 | Admin-only routes |

### Usage Example

Public Route (No Authentication)

```ts
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}
```

Role-Restricted Route (Admin Only)

```ts
  @Get('test-rbac')
  @RBAC(Role.ADMIN)
  async testRBAC() {
    return true;
  }
```

Multiple Roles Allowed

```ts
  @Get('test-rbac')
  @RBAC(Role.ADMIN, Role.USER)
  async testRBAC() {
    return true;
  }
```

### How It Works

1. `JWT Guard`는 `APP_GUARD`를 통해 전역으로 등록됩니다.
2. 모든 요청은 `APP_GUARD`를 거칩니다.
3. GUARD는 `@Public()` 데코레이터를 확인하여 인증을 건너뜁니다.
4. GUARD는 JWT 토큰의 유효성을 검하고, 사용자 페이로드가 요청에 있는지 확인합니다.
5. GUARD는 `@RBAC()` 데코레이터를 통해 접근 권한을 확인하고, 접근을 허용하거나 거부합니다.
