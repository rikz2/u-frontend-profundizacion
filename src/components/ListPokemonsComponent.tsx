// src/components/ListPokemonsComponent.tsx
import React, { useState, useEffect } from 'react';
import CardPokemonComponent from './CardPokemonComponent';
import PokemonDetailModal from './PokemonDetailModal';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  name: string;
  imageUrl: string;
  weight: number;
  order: number;
  types: string[];
  stats: { name: string; base_stat: number }[];
}

const ListPokemonsComponent: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const pokemonsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        setPokemons(data.results);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Función para abrir el modal con detalles del Pokémon
  const openPokemonDetail = (url: string) => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const pokemonDetail: PokemonDetail = {
          name: data.name,
          imageUrl: data.sprites.front_default,
          weight: data.weight,
          order: data.order,
          types: data.types.map((type: any) => type.type.name),
          stats: data.stats.map((stat: any) => ({
            name: stat.stat.name,
            base_stat: stat.base_stat,
          })),
        };
        setSelectedPokemon(pokemonDetail);
        setShowModal(true);
        setLoading(false);
      });
  };

  return (
    <div id='pokedex'>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar Pokémon"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {currentPokemons.map((pokemon) => {
            const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
            return (
              <div className="col-md-3 mb-4" key={pokemonId} onClick={() => openPokemonDetail(pokemon.url)}>
                <CardPokemonComponent
                  name={pokemon.name}
                  imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                />
              </div>
            );
          })}
        </div>
      )}

      {!loading && (
        <div className='d-flex justify-content-center'>
          <div className="pagination-controls d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-primary"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              className="btn btn-primary"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      <PokemonDetailModal
        show={showModal}
        onClose={() => setShowModal(false)}
        pokemon={selectedPokemon}
      />
    </div>
  );
};

export default ListPokemonsComponent;
