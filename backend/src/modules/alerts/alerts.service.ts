
import {
  Injectable,
  Logger
} from '@nestjs/common';

@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);

  constructor(
   // private readonly auctionService: AuctionService
  ) {
    this.logger.error(`AlertsService`);
  }
 
}
