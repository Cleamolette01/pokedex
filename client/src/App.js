import React, { useState, useEffect, useRef } from "react";
import PokemonList from "./components/PokemonList";
import "./custom.css";
import pokeballImage from "./pokeball.png";
import getAllTypes from "./tools";
import PokemonDetail from "./components/PokemonDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [sortType, setSortType] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Focus the input element
    }
  }, [searchTerm]);

  const sortPokemons = (type) => {
    const sortedPokemons = [...pokemons];
    if (type === "nameAsc") {
      sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "nameDesc") {
      sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
    } else if (type === "indexAsc") {
      sortedPokemons.sort((a, b) => a.originalIndex - b.originalIndex);
    } else if (type === "indexDesc") {
      sortedPokemons.sort((a, b) => b.originalIndex - a.originalIndex);
    }
    setPokemons(sortedPokemons);
  };

  const filterPokemons = () => {
    let filteredPokemons = [...pokemons];
    if (selectedTypes.length > 0) {
      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemon.types.some((type) => selectedTypes.includes(type))
      );
    }
    if (searchTerm.trim() !== "") {
      filteredPokemons = filteredPokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pokemon.originalIndex.toString().includes(searchTerm)
      );
    }
    return filteredPokemons;
  };

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }

    const clickedPokemon = pokemons.find((pokemon) =>
      pokemon.types.includes(type)
    );
    setSelectedPokemon(clickedPokemon);
  };

  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/pokemons")
      .then((response) => response.json())
      .then((data) => {
        const pokemonsWithOriginalIndex = data.pokemons.map(
          (pokemon, index) => ({
            ...pokemon,
            originalIndex: index + 1,
          })
        );
        setPokemons(pokemonsWithOriginalIndex);

        const types = getAllTypes(data.pokemons); // Get all types with colors from data
        setAllTypes(types); // Update state with types and colors
      })
      .catch((error) => console.error("Error fetching pokemons:", error));
  }, []);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    const updatedPokemons = [
      pokemon,
      ...pokemons.filter((p) => p.id !== pokemon.id),
    ];
    setPokemons(updatedPokemons);
  };

  const Home = () => {
    return (
      <div className="flex flex-wrap justify-between items-center mb-4 text-center mx-auto">
        {/* Search */}
        <div className="mb-2 w-full md:w-1/2 md:flex md:justify-start">
          <input
            type="text"
            placeholder="Search by name/number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded p-2 border-gray-300 border mr-2 md:w-1/2"
            ref={searchInputRef}
          />

          <button
            onClick={() => setSearchTerm("")}
            className="px-3 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>

        {/* Sort by */}
        <div className="mb-2 w-full md:w-1/2 md:flex md:justify-end">
          <label htmlFor="sortType">Sort by:</label>
          <select
            id="sortType"
            value={sortType}
            onChange={(e) => {
              setSortType(e.target.value);
              sortPokemons(e.target.value);
            }}
            className="md:ml-2"
          >
            <option value="none">-- Select an option --</option>
            <option value="nameAsc">A → Z</option>
            <option value="nameDesc">Z → A</option>
            <option value="indexAsc">Ascending index</option>
            <option value="indexDesc">Descending index</option>
          </select>
        </div>
        {/* Filter by type */}
        <div className="w-full md:w-1/2 text-left">
          <label className="mr-2">Filter by type:</label>
          <div className="label-wrapper">
            {allTypes.map(({ type, color }, index) => (
              <label
                key={type}
                className={`px-2 py-1 m-1 rounded-full cursor-pointer ${
                  selectedTypes.includes(type) ? "text-white" : "text-gray-700"
                } hover:bg-opacity-80 transition`}
                onClick={() => handleTypeChange(type)}
                style={{
                  backgroundColor: color, // Set the background color dynamically
                }}
              >
                {type}
              </label>
            ))}
          </div>
        </div>

        <PokemonList
          pokemons={filterPokemons()}
          onPokemonClick={handlePokemonClick}
          selectedPokemon={selectedPokemon}
        />
      </div>
    );
  };

  return (
    <Router>
      <div className="container mx-auto p-8">
        <div className="flex justify-center items-center mb-4">
          <img src={pokeballImage} alt="Pokeball" className="w-8 h-8 mr-2" />
          <h1 className="text-3xl font-semibold text-center mb-4">Pokedex</h1>
          <img src={pokeballImage} alt="Pokeball" className="w-8 h-8 ml-2" />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokemon/:id"
            element={<PokemonDetail pokemon={selectedPokemon} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
