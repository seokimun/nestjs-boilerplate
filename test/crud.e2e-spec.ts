import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '../src/libs/prisma/prisma.service';
import { AppModule } from './../src/app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from '../src/libs/filters/http-exception.filter';
import helmet from 'helmet';
import { JwtService } from '@nestjs/jwt';

describe('CrudController (e2e)', () => {
  let app: NestExpressApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let accessToken: string;

  function createLogger() {
    return WinstonModule.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.prettyPrint(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
      ],
    });
  }

  function applyMainConfig(app: NestExpressApplication) {
    app.set('trust proxy', 1);

    app.use(cookieParser());

    app.enableVersioning({
      type: VersioningType.URI,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: false,
        forbidNonWhitelisted: false,
      }),
    );

    app.useGlobalFilters(new HttpExceptionFilter());

    app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      }),
    );
  }

  //DB 초기화
  async function resetDb() {
    await prisma.$executeRawUnsafe(`
      TRUNCATE TABLE "Crud", "User"
      RESTART IDENTITY
      CASCADE;
    `);
  }

  function authHeader() {
    return { Authorization: `Bearer ${accessToken}` };
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>({
      logger: createLogger(),
    });

    applyMainConfig(app);
    await app.init();

    prisma = app.get(PrismaService);
    jwt = app.get<JwtService>(JwtService);

    await resetDb();

    const user = await prisma.user.create({
      data: {
        email: 'e2e@test.com',
        name: 'e2e-user',
        role: 'USER',
      },
    });

    accessToken = await jwt.sign(
      { id: user.id, role: user.role },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '10m',
      },
    );
  });

  beforeEach(async () => {
    await resetDb();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('[GET /v1/crud]', () => {
    it('should return empty crud', async () => {
      await request(app.getHttpServer())
        .get('/v1/crud')
        .set(authHeader())
        .expect(200)
        .expect([]);
    });

    it('should return all crud', async () => {
      await prisma.crud.createMany({
        data: [
          { testField1: 'a', testField2: 1 },
          { testField1: 'b', testField2: 2 },
        ],
      });

      const res = await request(app.getHttpServer())
        .get('/v1/crud')
        .set(authHeader())
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('[GET /v1/crud/:id]', () => {
    it('should throw NotFoundException if crud not found', async () => {
      await request(app.getHttpServer())
        .get('/v1/crud/00000000-0000-0000-0000-000000000000')
        .set(authHeader())
        .expect(404);
    });

    it('should return a crud by id', async () => {
      const created = await prisma.crud.create({
        data: { testField1: 'c', testField2: 3 },
      });

      const res = await request(app.getHttpServer())
        .get(`/v1/crud/${created.id}`)
        .set(authHeader())
        .expect(200);

      expect(res.body.id).toBe(created.id);
      expect(res.body.testField1).toBe('c');
      expect(res.body.testField2).toBe(3);
    });
  });

  describe('[POST /v1/crud]', () => {
    it('should create crud', async () => {
      const dto = { testField1: 'd', testField2: 4 };

      const res = await request(app.getHttpServer())
        .post('/v1/crud')
        .set(authHeader())
        .send(dto)
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.testField1).toBe(dto.testField1);
      expect(res.body.testField2).toBe(dto.testField2);
    });

    it('should return 400 when invalid body', async () => {
      await request(app.getHttpServer())
        .post('/v1/crud')
        .set(authHeader())
        .send({ testField1: 'x' })
        .expect(400);
    });
  });

  describe('[PATCH /v1/crud/:id]', () => {
    it('should update crud', async () => {
      const created = await prisma.crud.create({
        data: { testField1: 'e', testField2: 5 },
      });

      const res = await request(app.getHttpServer())
        .patch(`/v1/crud/${created.id}`)
        .set(authHeader())
        .send({ testField1: 'f', testField2: 6 })
        .expect(200);

      expect(res.body.testField1).toBe('f');
      expect(res.body.testField2).toBe(6);
    });

    it('should throw NotFoundException if crud not found', async () => {
      await request(app.getHttpServer())
        .patch('/v1/crud/00000000-0000-0000-0000-000000000000')
        .set(authHeader())
        .send({ testField1: 'g', testField2: 7 })
        .expect(404);
    });
  });

  describe('[DELETE /v1/crud/:id]', () => {
    it('should delete crud', async () => {
      const created = await prisma.crud.create({
        data: { testField1: 'h', testField2: 8 },
      });

      await request(app.getHttpServer())
        .delete(`/v1/crud/${created.id}`)
        .set(authHeader())
        .expect(200);

      const row = await prisma.crud.findUnique({ where: { id: created.id } });
      expect(row).toBeNull();
    });

    it('should throw NotFoundException if crud not found', async () => {
      await request(app.getHttpServer())
        .delete('/v1/crud/00000000-0000-0000-0000-000000000000')
        .set(authHeader())
        .expect(404);
    });
  });
});
