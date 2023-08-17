import { Controller, Get, Logger, Param, Query } from '@nestjs/common';

import { PokemonsService } from './pokemons.service';
import { FetchPokemonsInboundDto } from './dtos/fetch-pokemons.inbound.dto';
import { FetchPokemonsOutboundDto } from './dtos/fetch-pokemons.outbound.dto';
import { GetPokemonOutboundDto } from './dtos/get-pokemon.outbound.dto';

@Controller('pokemons')
export class PokemonsController {
  private readonly logger = new Logger(PokemonsController.name);

  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async fetchPokemons(
    @Query() inboundDto: FetchPokemonsInboundDto,
  ): Promise<FetchPokemonsOutboundDto> {
    this.logger.log('Inbound dto', inboundDto);

    const result = await this.pokemonsService.fetchPokemons(
      inboundDto.limit,
      inboundDto.page,
    );

    const outboundDto = new FetchPokemonsOutboundDto(result);

    return outboundDto;
  }

  @Get('/:pokemonName')
  async getPokemon(
    @Param('pokemonName') pokemonName: string,
  ): Promise<GetPokemonOutboundDto> {
    this.logger.log('Pokemon name', pokemonName);

    const result = await this.pokemonsService.getPokemon(pokemonName);

    const outboundDto = new GetPokemonOutboundDto(result);

    return outboundDto;
  }
}
