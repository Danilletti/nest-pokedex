import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { isValidObjectId, Model } from 'mongoose';
import { Pokemonapi } from './entities/pokemonapi.entity';

import { CreatePokemonapiDto } from './dto/create-pokemonapi.dto';
import { UpdatePokemonapiDto } from './dto/update-pokemonapi.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonapiService {

  private defaultLimit: number

  constructor(
    @InjectModel(Pokemonapi.name)
    private readonly pokemonModel: Model<Pokemonapi>,
    private readonly configService: ConfigService
  ) {
    // console.log(process.env.DEFAULT_LIMIT);
    // console.log(configService.get('defaultLimit'));

    this.defaultLimit = configService.get<number>('defaultLimit')
  }


  async create(createPokemonapiDto: CreatePokemonapiDto) {
    createPokemonapiDto.name = createPokemonapiDto.name.toLocaleLowerCase()

    try {
      const pokemon = await this.pokemonModel.create(createPokemonapiDto);
      return pokemon;
    } catch (error) {
      this.handleExeption(error)
    }

  }
  findAll(paginationDto: PaginationDto) {

    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1
      })
      .select('-__v')
  }

  async findOne(term: string) {
    let pokemon: Pokemonapi
    //termino o numero
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    //mongoId
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
    }
    //Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() })
    }
    if (!pokemon)
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    return pokemon
  }

  async update(term: string, updatePokemonapiDto: UpdatePokemonapiDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonapiDto.name)
      updatePokemonapiDto.name = updatePokemonapiDto.name.toLocaleLowerCase();
    try {
      await pokemon.updateOne(updatePokemonapiDto);
      return { ...pokemon.toJSON(), ...updatePokemonapiDto };
    } catch (error) {
      this.handleExeption(error)
    }
  }

  async remove(id: string) {
    //const pokemon = await this.findOne(id)
    //this.pokemonModel.findByIdAndDelete(id)
    //await pokemon.deleteOne();
    //return { id };
    //const result = await this.pokemonModel.findByIdAndDelete(id)
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    return
  }

  private handleExeption(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon Exist in DB ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't Create Pokemon - Check Server logs`)
  }
}
