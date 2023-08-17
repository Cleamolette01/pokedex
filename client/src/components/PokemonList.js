import React from "react";
import PokemonCard from "./PokemonCard";

import { Link } from "react-router-dom";
const PokemonList = ({ pokemons, onPokemonClick, selectedPokemon }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.originalIndex}
          className={`w-1/2 md:w-1/3 lg:w-1/4 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100`}
          style={{
            width:
              selectedPokemon && selectedPokemon.id === pokemon.id
                ? "100%"
                : "auto",
            margin:
              selectedPokemon && selectedPokemon.id === pokemon.id
                ? "0"
                : "0.25rem",
          }}
          onClick={() => onPokemonClick(pokemon)}
        >
          <Link to={`/pokemon/${pokemon.id}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
