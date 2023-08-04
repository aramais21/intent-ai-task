import { createMongooseAsyncProviders } from '@nestjs/mongoose/dist/mongoose.providers';
import { Ad } from './ad.schema';

const createMongooseModels = (schemaClasses: Array<any>) => {
  return createMongooseAsyncProviders(
    undefined,
    schemaClasses.map((schemaClass) => ({
      name: schemaClass.name,
      useFactory: schemaClass.setupSchema.bind(schemaClass),
      inject: [],
    })),
  );
};

export const MONGOOSE_PROVIDERS = createMongooseModels([Ad]);
export { Ad };
