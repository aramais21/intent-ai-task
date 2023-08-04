import { Injectable } from '@nestjs/common';

import { AdService } from './ad.service';
import { AdTypeEnum } from '../dto/ad.dto';
import { Ad } from '../schemas';

@Injectable()
export class BidService {
  constructor(private adService: AdService) {}

  async constructBidResponseFromBid(bidRequest) {
    const bidRequestId = bidRequest.id;
    const imps = bidRequest.imp;
    const blockedCategories = bidRequest.bcat;
    const seatbid = {
      bid: [],
      seat: 'seatId',
    };

    for await (const imp of imps) {
      const video = imp.video;
      const audio = imp.audio;
      const impId = imp.id;
      let type: AdTypeEnum = AdTypeEnum.Banner;
      if (video) {
        type = AdTypeEnum.Audio;
      } else if (audio) {
        type = AdTypeEnum.Video;
      }
      const ad = await this.adService.findOneByType(type, {
        blockedCategories,
      });
      const bid = {
        id: bidRequestId,
        impid: impId,
        price: this.calculatePrice(imp, ad),
        adid: ad?._id || 'ad id',
        adm: ad?.media || 'ad media',
        adomain: [ad?.domain],
      };
      seatbid.bid.push(bid);
    }
    const response = {
      id: bidRequestId,
      seatbid: seatbid,
    };
    return response;
  }

  private calculatePrice(imp, ad?: Ad) {
    const difference = ad ? ad.maxPrice - ad.minPrice : 1;
    return Math.floor(Math.random() * difference) + (ad ? ad.minPrice : 0);
  }
}
