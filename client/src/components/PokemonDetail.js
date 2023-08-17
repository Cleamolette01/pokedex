import React from "react";
import colors from "../colors";

const PokemonDetail = ({ pokemon }) => {
  if (!pokemon) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-3xl font-semibold mb-4">{pokemon.name}</h2>
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        style={{ maxWidth: "30%", height: "auto" }}
        className="w-full h-auto rounded-lg shadow-md mb-4"
      />

      <div className="flex">
        <div className="mr-4">
          <h3 className="font-semibold mb-2">Types:</h3>
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 m-1 rounded-full text-white text-sm"
              style={{ backgroundColor: colors[type] }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
