
import {
  Injectable,
  Logger
} from '@nestjs/common';

import { AuctionService } from 'src/auction/auction.service';
@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);

  constructor(
    private readonly auctionService: AuctionService
  ) {
    this.logger.error(`AlertsService`);
  }
 
}
