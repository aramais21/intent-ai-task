import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AdService } from './ad.service';
import { BidService } from './bid.service';

export const SERVICES: Provider[] = [AdService, BidService];
