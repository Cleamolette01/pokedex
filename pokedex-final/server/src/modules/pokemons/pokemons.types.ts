export type GetPokemonResponse = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

export type GetPokemonDto = {
  name: string;
  imageUrl: string;
  types: string[];
};

export type FetchPokemonsResponse = {
  count: number;
  results: { name: string }[];
};

export type FetchPokemonsDto = {
  count: number;
  pokemons: GetPokemonDto[];
};
