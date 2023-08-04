import { Prop, Schema } from '@nestjs/mongoose';

import { BaseSchema } from './base.schema';
import { AdTypeEnum } from '../dto/ad.dto';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  toObject: {
    getters: true,
  },
  collection: 'ads',
})
export class Ad extends BaseSchema {
  @Prop()
  title: string;

  @Prop()
  media: string;

  @Prop()
  domain: string;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(AdTypeEnum),
    index: true,
  })
  type: AdTypeEnum;

  @Prop({
    type: [String],
    index: true,
  })
  categories: string[];

  @Prop()
  minPrice: number;

  @Prop()
  maxPrice: number;
}
