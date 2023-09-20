import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonapiDto } from './create-pokemonapi.dto';

export class UpdatePokemonapiDto extends PartialType(CreatePokemonapiDto) {}
