import { Controller, Get, Header } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from '../../../libs/decorators/public.decorator';
import { MetricsService } from './metrics.service';

@Controller({ path: 'metrics', version: '1' })
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  @Public()
  @SkipThrottle()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  async getMetrics() {
    const body = await this.metricsService.metrics();
    return body;
  }
}
