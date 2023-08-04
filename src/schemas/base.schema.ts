import { SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export class BaseSchema {
  _id: ObjectId;

  static setupSchema() {
    return SchemaFactory.createForClass(this);
  }
}
