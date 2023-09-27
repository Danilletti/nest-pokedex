import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokemonapiService } from './pokemonapi.service';
import { CreatePokemonapiDto } from './dto/create-pokemonapi.dto';
import { UpdatePokemonapiDto } from './dto/update-pokemonapi.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonapiController {
  constructor(private readonly pokemonapiService: PokemonapiService) { }

  @Post()
  //@HttpCode(HttpStatus.OK)
  //@HttpCode(200)
  create(@Body() createPokemonapiDto: CreatePokemonapiDto) {
    return this.pokemonapiService.create(createPokemonapiDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonapiService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonapiService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonapiDto: UpdatePokemonapiDto) {
    return this.pokemonapiService.update(term, updatePokemonapiDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonapiService.remove(id);
  }
}
