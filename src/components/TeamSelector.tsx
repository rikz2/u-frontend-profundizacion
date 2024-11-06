// src/components/TeamSelector.tsx
import React, { useState, useEffect } from 'react';
import Pokemon from '../models/PokemonModel.tsx'; // Asegúrate de que el modelo esté en el lugar correcto

import BattleSimulator from './BattleSimulator'; // Importa el componente del simulador de batalla

const TeamSelector: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pokemonsPerPage = 10; // Número de Pokémon por página

  useEffect(() => {
    // Obtener la lista de Pokémon de la PokéAPI
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => setPokemons(data.results));
  }, []);

  // Función para agregar un Pokémon al equipo con datos completos
  const addToTeam = async (pokemon: Pokemon) => {
    if (team.length < 5 && !team.some(p => p.name === pokemon.name)) {
      // Obtener detalles del Pokémon
      const response = await fetch(pokemon.url);
      const data = await response.json();

      // Crear un objeto con datos completos, incluyendo stats
      const detailedPokemon: Pokemon = {
        name: data.name,
        url: pokemon.url,
        stats: data.stats.map((stat: any) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        })),
      };

      // Actualizar el equipo con el Pokémon detallado
      setTeam([...team, detailedPokemon]);
    }
  };


  // Función para eliminar un Pokémon del equipo
  const removeFromTeam = (pokemon: Pokemon) => {
    setTeam(team.filter(member => member !== pokemon));
  };

  // Paginación: Calcular los Pokémon para la página actual
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  // Funciones para manejar la paginación
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Obtener el ID del Pokémon desde la URL
  const getPokemonId = (url: string) => url.split('/').slice(-2, -1)[0];

  return (
    <div className="team-selector" id='team_selector'>
      <h2 className='text-center'>Selecciona tu equipo de Pokémon</h2>
      
      {/* Equipo seleccionado */}
      <div className="selected-team mt-4">
        <div className="d-flex justify-content-center">
          <span className='px-5 fw-bold fs-5 text-center bg-primary rounded-4 py-4 bg-opacity-25'>
            Equipo Seleccionado ({team.length}/5)
          </span>
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {team.map(pokemon => (
            <div key={pokemon.name} className="card m-2" style={{ width: '120px' }}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`}
                className="card-img-top"
                alt={pokemon.name}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{pokemon.name}</h6>
                <button
                  onClick={() => removeFromTeam(pokemon)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='row justify-content-center'>
          <div className="col-lg-8 col-md-11">
            <div className='row justify-content-center py-4'>
              <div className='col-md-6 bg-white rounded-5 d-flex flex-column justify-content-center'>
                {/* Lista de Pokémon disponibles */}
                <div className="available-pokemons mt-4">
                  <h3 className='fw-bold fs-3'>Lista de Pokémon</h3>
                  <div className="row list-card">
                    {currentPokemons.map(pokemon => (
                      <div key={pokemon.name} className="col-12 mb-4">
                        <div className="card" style={{ width: '100%' }}>
                          <div className='row'>
                            <div className='col-md-6'>
                              <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`}
                                className="card-img-top"
                                alt={pokemon.name}
                              />
                            </div>
                            <div className="col-md-6 card-body text-center">
                              <h6 className="card-title">{pokemon.name}</h6>
                              <button
                                onClick={() => addToTeam(pokemon)}
                                disabled={team.length >= 5 || team.includes(pokemon)}
                                className="btn btn-primary btn-sm"
                              >
                                {team.includes(pokemon) ? "En equipo" : "Agregar"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Paginación */}
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
              </div>

              {/* Simulador de Batalla */}
              <div className='col-md-6 mt-4 mt-sm-0'>
                <div className="d-flex justify-content-center align-items-center">
                  <div className='text-center bg-white rounded-5 p-4'>
                    <BattleSimulator userTeam={team} /> {/* Pasa el equipo del usuario al simulador */}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

    </div>
  );
};

export default TeamSelector;
