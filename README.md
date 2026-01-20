# NestJS Boilerplate

## ✨ Features

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

## 🧱 Tech Stack

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

## 📂 Project Structure

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

## 🚀 Quick Start

### Prerequisites

다음 항목들이 설치 및 구성되어 있는지 확인하세요:

- Node.js **>= 22.13.0**
- Docker & Docker Compose
- npm
- Google Cloud Platform account
  - OAuth 2.0 Client ID & Secret configured
  - Authorized redirect URI set for Google OAuth

### Installation

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

## 🔐 Environment Variables & Secret Management

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
JWT_ACCESS_SECRET=(your-jwt-secret)
JWT_ACCESS_EXPIRES_IN=20s
JWT_REFRESH_SECRET=(your-jwt-refresh-secret)
JWT_REFRESH_EXPIRES_IN=14d

# Database URL
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres?schema=public
```

## 🐳 Docker Setup

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

## 🔐 Authentication & Authorization

This project implements secure authentication and authorization using
**Google OAuth 2.0**, **JWT\***, and **RBAC**.

Authentication and authorization are strictly enforced on the server side.

### Authentication Overview

Authentication is handled using **Google OAuth 2.0** for identity verification
and JWT (Access Token / Refresh Token) for session management.

Supported Authentication Methods

- Google OAuth 2.0 (Login)

- JWT-based authentication for API access

### Google OAuth Flow

1. Client initiates authentication:

   `GET /v1/auth/google`

2. User is redirected to Google Login

3. Google redirects back to the application:

   `GET /v1/auth/google/callback`

4. Server-side processing

   - Validates Google OAuth response

   - Verifies Google user profile

   - Finds an existing user or creates a new user

   - Issues a JWT Access Token and Refresh Token

5. Client receives tokens

    - Access Token: used for authenticated API requests

    - Refresh Token: used to obtain new Access Tokens

### JWT Authentication

#### Access Token

- Used for authenticating API requests

- Sent via HTTP header:

  ```bash
  Authorization: Bearer <access_token>
  ```

- Validated using a Passport JWT strategy

- User payload is attached to the request context (req.user)

#### Refresh Token

- Used to re-issue Access Tokens

- Typically stored in HTTP-only cookies

- Validated separately via a dedicated guard/strategy

### Role-Based Access Control (RBAC)

Authorization is enforced using server-side role validation.

#### Supported Roles

- `ADMIN`

- `USER`

#### RBAC Decorator

Access to routes can be restricted using the `@RBAC()` decorator.

#### Admin-only Route

```ts
@Get('admin-only')
@RBAC(Role.ADMIN)
async adminOnly() {
  return true;
}
```

#### Multiple Roles Allowed

```ts
@Get('user-or-admin')
@RBAC(Role.ADMIN, Role.USER)
async userOrAdmin() {
  return true;
}

```

### Public Routes

Routes that do not require authentication can be explicitly marked using the `@Public()` decorator.

```ts
@Public()
@Get('google')
@UseGuards(AuthGuard('google'))
async googleLogin() {}

```

### Summary

- Google OAuth is used for identity verification

- JWT Access Tokens authenticate API requests

- Refresh Tokens are used for secure token renewal

- Authorization is enforced via RBAC decorators

- Global guards ensure consistent security enforcement

- Public access is explicitly declared using @Public()

## 🩺 Health Check (Liveness / Readiness)

This project implements **Kubernetes/AWS-style health checks** using `@nestjs/terminus`.

### Endpoints

| Endpoint           | Type      | Description                     |
| ------------------ | --------- | ------------------------------- |
| `/v1/health`       | Liveness  | Checks application process only |
| `/v1/health/ready` | Readiness | Checks application + database   |

### Liveness Check

```http
GET /v1/health
```

- Confirms the API process is running

- Does NOT check database connectivity

- Used for container/process restarts

### Readiness Check

```http
GET /v1/health/ready
```

- Confirms database connectivity

- Uses a SELECT 1 Prisma query

- Returns HTTP 503 when unavailable

- Used for traffic routing (load balancers)

### Summary

- Database failures do NOT crash the application

- Detailed error logs are written internally

- External systems only see up / down status

## 🚦 Rate Limiting & Throttling

Rate limiting is implemented using `@nestjs/throttler` to protect against abuse.

### Global Throttling Policy

```ts
ThrottlerModule.forRoot({
  throttlers: [
    {
      ttl: 60_000,
      limit: 60,
    },
  ],
});
```

- Allows 60 requests per 60 seconds per IP

- Applies globally via APP_GUARD

### Authentication-Specific Policies

- Login and OAuth endpoints can be throttled more strictly

- Guards can be overridden per route or controller

### Proxy Awareness

When running behind a proxy or load balancer:

```ts
app.set('trust proxy', 1);
```

This ensures rate limiting is applied per client IP, not per proxy.

## 📊 Logging & Observability

This project uses **Winston** for structured logging.

### Logger Configuration

- JSON logs with timestamps
- Stack traces for errors
- Console output for development
- File output for persistent logs

### Log Levels

- `info` – Application events
- `warn` – Unexpected but recoverable issues
- `error` – Failures and exceptions

### Request Logging

- Incoming requests are logged via middleware
- Health check failures log minimal information
- Sensitive details are never exposed to clients

### Production Notes

- Logs should be shipped to centralized systems (CloudWatch, ELK, Datadog)
- File-based logging is for local and container debugging only

## 📄License

MIT

## 🤝 Contributing

Contributions are welcome and appreciated.

If you want to improve this boilerplate, follow the steps below.

### How to Contribute

1. Fork the repository
2. Create a new branch for your feature or fix
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes with clear and descriptive messages

4. Push the branch to your fork

5. Open a Pull Request

### Contribution Guidelines

- Follow the existing project structure and conventions

- Keep commits small and focused

- Add or update documentation if behavior changes

- Ensure the project builds and runs correctly

## 📞 Support

if you have questions, encounter issues, or need help using this project, please open a **Github issue**

### Notes

- Do not share sensitive information such as access tokens or secrets
- Provide as much context as possible when asking for help
