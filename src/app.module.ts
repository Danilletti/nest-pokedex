import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonapiModule } from './pokemonapi/pokemonapi.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
@Module({
  imports: [
    //siemprea arriba
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),


    MongooseModule.forRoot(process.env.MONGODB, {
      dbName:'PokemonsDB'
    }),
    PokemonapiModule,
    CommonModule,
    SeedModule
  ],
})
export class AppModule {
}
