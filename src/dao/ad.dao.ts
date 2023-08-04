import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

import { Ad } from '../schemas';
import { AdDto, AdQueryDto, AdTypeEnum } from '../dto/ad.dto';

@Injectable()
export class AdDao {
  constructor(
    @InjectModel(Ad.name)
    private model: Model<Ad & Document>,
  ) {}

  async getAllAds(params: AdQueryDto): Promise<Ad[] | null> {
    return this.model
      .find({
        ...(params?.offset ? { _id: { $lt: params.offset } } : {}),
      })
      .sort({ _id: -1 })
      .limit(params?.limit || 20);
  }

  create(data) {
    return this.model.create(data);
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  async deleteById(id: string) {
    await this.model.deleteOne({ _id: new ObjectId(id) });
    return;
  }

  updateById(id: string, data: AdDto) {
    return this.model.findByIdAndUpdate(id, { $set: data });
  }

  findOneByType(type: AdTypeEnum) {
    return this.model.findOne({
      type,
    });
  }

  findOneByTypeAndFilterBlockedCategories(
    type: AdTypeEnum,
    blockedCategories: string[],
  ) {
    return this.model.findOne({
      type,
      categories: { $nin: blockedCategories },
    });
  }
}
