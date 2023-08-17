import React from "react";
import colors from "../colors";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md text-center">
      <img
        className="mx-auto w-40 h-40 object-contain"
        src={pokemon.imageUrl}
        alt={pokemon.name}
      />
      <div className="mt-2">
        <span className="text-gray-500">#{pokemon.originalIndex}</span>
        <h3 className="text-lg font-semibold">{pokemon.name}</h3>
        <div className="mt-2">
          {pokemon.types.map((type, idx) => (
            <span
              key={idx}
              className={`inline-block rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2`}
              style={{
                backgroundColor: colors[type],
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
