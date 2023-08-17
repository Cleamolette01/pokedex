import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import {
  FetchPokemonsDto,
  FetchPokemonsResponse,
  GetPokemonDto,
  GetPokemonResponse,
} from './pokemons.types';

@Injectable()
/**
 * PokemonsService
 * a simple bridge to the PokeApi
 * see relative documentation: https://pokeapi.co/docs/v2
 */
export class PokemonsService {
  private readonly API_BASE_URL: string = 'https://pokeapi.co/api/v2';

  constructor(private readonly httpService: HttpService) {}

  async getPokemon(pokemonName: string): Promise<GetPokemonDto> {
    const endpoint = `${this.API_BASE_URL}/pokemon/${pokemonName}`;

    const request$ = this.httpService.get<GetPokemonResponse>(endpoint);

    const response = await lastValueFrom(request$);

    const { name, sprites, types } = response.data;

    const result: GetPokemonDto = {
      name,
      imageUrl: sprites.front_default,
      types: types.map(({ type: { name } }) => name),
    };

    return result;
  }

  async fetchPokemons(
    limit: number,
    offset: number,
  ): Promise<FetchPokemonsDto> {
    const endpoint = `${this.API_BASE_URL}/pokemon`;

    const request$ = this.httpService.get<FetchPokemonsResponse>(endpoint, {
      params: { limit, offset },
    });

    const response = await lastValueFrom(request$);

    const pokemonsList = response.data.results;

    const pokemonsWithDetailsPromises = pokemonsList.map(({ name }) =>
      this.getPokemon(name),
    );

    const pokemonsWithDetails = await Promise.all(pokemonsWithDetailsPromises);

    const result = {
      count: response.data.count,
      pokemons: pokemonsWithDetails,
    };

    return result;
  }
}
