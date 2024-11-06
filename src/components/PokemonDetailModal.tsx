// src/components/PokemonDetailModal.tsx
import React from 'react';

interface PokemonDetail {
  name: string;
  imageUrl: string;
  weight: number;
  order: number;
  types: string[];
  stats: { name: string; base_stat: number }[];
}

interface PokemonDetailModalProps {
  show: boolean;
  onClose: () => void;
  pokemon: PokemonDetail | null;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ show, onClose, pokemon }) => {
  if (!show || !pokemon) return null;

  // Función para obtener la clase CSS según el tipo de Pokémon, con un fondo por defecto
  const getTypeClass = (type: string) => {
    switch (type) {
      case 'normal': return 'type-normal';
      case 'fire': return 'type-fire';
      case 'grass': return 'type-grass';
      case 'water': return 'type-water';
      case 'bug': return 'type-bug';
      case 'flying': return 'type-flying';
      case 'fairy': return 'type-fairy';
      case 'fighting': return 'type-fighting';
      case 'ground': return 'type-ground';
      case 'rock': return 'type-rock';
      case 'poison': return 'type-poison';
      case 'psychic': return 'type-psychic';
      case 'electric': return 'type-electric';
      default: return 'type-default'; // Clase de fondo predeterminada
    }
  };


  return (
    <div className="pokemonDetailCard modal fade show d-block" tabIndex={-1}>
      <div className="modal-dialog position z-3">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {pokemon.name}
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <div className='row m-0'>
              <div className='col-md-6 p-0 d-flex align-items-center justify-content-center'>
                <img src={pokemon.imageUrl} alt={pokemon.name} className="img-fluid w-100 mb-3" />
              </div>
              <div className='col-md-6 p-0'>
                <div className='order'>
                  <p>{pokemon.order}</p>
                </div>
                <div className='characteristics'>
                  <div className='weight'>
                    <p><strong>Weight:</strong> {pokemon.weight}</p>
                  </div>
                  <div className='types'>
                    <p><strong>Types:</strong></p>
                    <div className='d-flex justify-content-center flex-wrap gap-2 fw-bold'>
                      {pokemon.types.map(type => (
                        <span key={type} className={`type-background ${getTypeClass(type)}`}>
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='stats'>
                    <h6>Stats:</h6>
                    <ul className="list">
                      {pokemon.stats.map(stat => (
                        <li key={stat.name}><strong>{stat.name}:</strong> {stat.base_stat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show z-2" onClick={onClose}></div>
    </div>
  );
};

export default PokemonDetailModal;
