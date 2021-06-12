import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LogEntity, Severity } from 'db';

import { AppService } from './app.service';
import { LogCommand } from './log.command';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(LogCommand.Log.Info)
  logInfo(@Payload() data: Partial<LogEntity>) {
    return this.appService.log({
      ...data,
      severity: Severity.Info,
    });
  }

  @EventPattern(LogCommand.Log.Error)
  logError(@Payload() data: Partial<LogEntity>) {
    return this.appService.log({
      ...data,
      severity: Severity.Error,
    });
  }
}
