import { Module } from '@nestjs/common';
import { PokemonapiService } from './pokemonapi.service';
import { PokemonapiController } from './pokemonapi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemonapi, PokemonSchema } from './entities/pokemonapi.entity';

@Module({
  controllers: [PokemonapiController],
  providers: [PokemonapiService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemonapi.name,
        schema: PokemonSchema,
      }
    ])
  ]
})
export class PokemonapiModule { }
