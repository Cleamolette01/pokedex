import { FetchPokemonsDto } from '../pokemons.types';

export class FetchPokemonsOutboundDto {
  count: number;
  pokemons: {
    name: string;
    imageUrl: string;
    types: string[];
  }[];

  constructor(dto: FetchPokemonsDto) {
    this.count = dto.count;

    this.pokemons = dto.pokemons.map(({ name, imageUrl, types }) => ({
      name,
      imageUrl,
      types,
    }));
  }
}
