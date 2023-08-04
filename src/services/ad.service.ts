import { Injectable } from '@nestjs/common';

import { AdDao } from '../dao';
import { AdDto, AdQueryDto, AdTypeEnum } from '../dto/ad.dto';
import { ErrorReasonsEnum } from '../dto/error.dto';

@Injectable()
export class AdService {
  constructor(private adDao: AdDao) {}

  createAd(data: AdDto) {
    if (data.minPrice > data.maxPrice) {
      throw new Error(ErrorReasonsEnum.InvalidPriceRange);
    }
    return this.adDao.create(data);
  }

  async deleteById(id: string) {
    const isIdValid = !!(await this.adDao.findById(id));
    if (!isIdValid) {
      throw new Error(ErrorReasonsEnum.ResourceNotFound);
    }
    return this.adDao.deleteById(id);
  }

  get(params: AdQueryDto) {
    return this.adDao.getAllAds(params);
  }

  updateById(id: string, data: AdDto) {
    return this.adDao.updateById(id, data);
  }

  async findOneByType(
    type: AdTypeEnum,
    params?: { blockedCategories?: string[] },
  ) {
    if (params?.blockedCategories) {
      return this.adDao.findOneByTypeAndFilterBlockedCategories(
        type,
        params.blockedCategories,
      );
    }
    return this.adDao.findOneByType(type);
  }
}
