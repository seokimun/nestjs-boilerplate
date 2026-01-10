import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { PrismaHealthIndicator } from '../../../libs/prisma/health/prisma.health';

@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async healthCheck() {
    const check = await this.health.check([
      () => ({
        app: { status: 'up' },
      }),
    ]);

    return {
      status: check.status,
      details: check.details,
    };
  }

  @Get('ready')
  @HealthCheck()
  async readyCheck() {
    const check = await this.health.check([() => this.db.isHealthy('db')]);
    return {
      status: check.status,
      details: check.details,
    };
  }
}
