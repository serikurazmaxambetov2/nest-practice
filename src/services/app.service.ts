import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export default class AppService {
  constructor(private loggerService: LoggerService) {}
}
