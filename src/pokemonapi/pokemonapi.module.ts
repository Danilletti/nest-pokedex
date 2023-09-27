import { Module } from '@nestjs/common';
import { PokemonapiService } from './pokemonapi.service';
import { PokemonapiController } from './pokemonapi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemonapi, PokemonSchema } from './entities/pokemonapi.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonapiController],
  providers: [PokemonapiService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemonapi.name,
        schema: PokemonSchema,
      }
    ])
  ],
  exports: [MongooseModule]
})
export class PokemonapiModule { }
