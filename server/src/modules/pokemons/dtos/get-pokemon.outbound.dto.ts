import { GetPokemonDto } from '../pokemons.types';

export class GetPokemonOutboundDto {
  name: string;
  imageUrl: string;
  types: string[];

  constructor(dto: GetPokemonDto) {
    const { name, imageUrl, types } = dto;

    this.name = name;
    this.imageUrl = imageUrl;
    this.types = types;
  }
}
