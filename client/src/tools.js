import colors from "./colors";

const getAllTypes = (pokemons) => {
  const typesSet = new Set();
  pokemons.forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      typesSet.add(type);
    });
  });
  const typesArray = Array.from(typesSet);

  const typesWithColors = typesArray.map((type) => ({
    type,
    color: colors[type],
  }));

  return typesWithColors;
};

export default getAllTypes; // Add this line to export the function
