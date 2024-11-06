// src/components/BattleSimulator.tsx
import React, { useState } from 'react';
import Pokemon from '../models/PokemonModel.tsx'; // Importa el modelo de Pokémon correctamente

interface BattleSimulatorProps {
  userTeam: Pokemon[]; // Equipo del usuario pasado como prop
}

const BattleSimulator: React.FC<BattleSimulatorProps> = ({ userTeam }) => {
  const [opponentTeam, setOpponentTeam] = useState<Pokemon[]>([]);
  const [battleResult, setBattleResult] = useState<string | null>(null);

  // Definir un tipo extendido con 'stats'
interface PokemonWithStats extends Pokemon {
    stats: { name: string; base_stat: number }[];
  }

  // Función para generar un equipo oponente aleatorio
  const generateOpponentTeam = async () => {
    const randomTeam: PokemonWithStats[] = [];
    for (let i = 0; i < userTeam.length; i++) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      randomTeam.push({
        name: data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${randomId}/`,
        stats: data.stats.map((stat: any) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        })),
      });
    }
    setOpponentTeam(randomTeam);
  };

   // Calcular el poder total de un equipo basado en la suma de estadísticas base
    const calculateTeamPower = (team: Pokemon[]) => {
        const power = team.reduce((total, pokemon) => {
        const pokemonPower = pokemon.stats
            ? pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
            : 0;
        return total + pokemonPower;
        }, 0);
    
        console.log(`Equipo: ${team.map(p => p.name).join(", ")} - Poder Total: ${power}`);
        return power;
    };
  
  

  // Función para iniciar la batalla y determinar el ganador
  const startBattle = () => {
    if (userTeam.length === 0 || opponentTeam.length === 0) {
      setBattleResult("Ambos equipos deben tener Pokémon para iniciar la batalla.");
      return;
    }

    const userPower = calculateTeamPower(userTeam);
    const opponentPower = calculateTeamPower(opponentTeam);

    if (userPower > opponentPower) {
      setBattleResult("¡Ganaste la batalla!");
    } else if (userPower < opponentPower) {
      setBattleResult("Perdiste la batalla.");
    } else {
      setBattleResult("Es un empate.");
    }
  };

  return (
    <div className="battle-simulator mt-5" id='battle_simulator'>
      <h2 className='fs-3'>Simulador de Batalla</h2>

      <button className="btn btn-secondary mb-3" onClick={generateOpponentTeam}>
        Generar Equipo Oponente
      </button>

      {/* Mostrar equipo del usuario */}
      <div className="team-section">
        <h3>Tu Equipo</h3>
        <div className="d-flex flex-wrap">
          {userTeam.map((pokemon) => (
            <div key={pokemon.name} className="card m-2" style={{ width: '120px' }}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)[0]}.png`}
                className="card-img-top"
                alt={pokemon.name}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{pokemon.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mostrar equipo oponente */}
      <div className="team-section mt-4">
        <h3>Equipo Oponente</h3>
        <div className="d-flex flex-wrap">
          {opponentTeam.map((pokemon) => (
            <div key={pokemon.name} className="card m-2" style={{ width: '120px' }}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)[0]}.png`}
                className="card-img-top"
                alt={pokemon.name}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{pokemon.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón para iniciar la batalla */}
      <button className="btn btn-primary mt-4" onClick={startBattle}>
        ¡Iniciar Batalla!
      </button>

      {/* Resultado de la batalla */}
      {battleResult && <div className="mt-3 alert alert-info">{battleResult}</div>}
    </div>
  );
};

export default BattleSimulator;
