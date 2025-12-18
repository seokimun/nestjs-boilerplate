import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from '../../../../prisma/health/prisma.health';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async healthCheck() {
    const healthCheck = await this.health.check([
      () =>
        this.http.pingCheck('http', 'https://docs.nestjs.com', {
          timeout: 300, // 좀비서버 체크, Dos 증폭방지
        }),
      () => this.db.isHealth('db'),
    ]);
    return {
      status: healthCheck.status,

      // 개발환경(해킹정찰 위험)
      // details: healthCheck.details,
    };
  }
}
