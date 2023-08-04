import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { BidService } from '../services/bid.service';

@Controller('/bidding')
export class BidController {
  constructor(private bidService: BidService) {}

  @Post('/')
  @HttpCode(200)
  async handleBidding(@Body() body) {
    try {
      return this.bidService.constructBidResponseFromBid(body);
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }
}
