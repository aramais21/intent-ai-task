import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { MONGOOSE_PROVIDERS } from './schemas';
import { DAO_PROVIDERS } from './dao';
import { SERVICES } from './services';
import { CONTROLLERS } from './controllers';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_DB_URI)],
  controllers: CONTROLLERS,
  providers: <Provider[]>[...MONGOOSE_PROVIDERS, ...DAO_PROVIDERS, ...SERVICES],
})
export class AppModule implements NestModule {
  configure(): any {}
}
