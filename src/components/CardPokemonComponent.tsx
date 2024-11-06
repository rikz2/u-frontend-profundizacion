// src/components/CardPokemonComponent.tsx
import React from 'react';

interface CardPokemonProps {
  name: string;
  imageUrl: string;
}

const CardPokemonComponent: React.FC<CardPokemonProps> = ({ name, imageUrl }) => (
  <div className="card">
    <img src={imageUrl} className="card-img-top" alt={name} />
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
    </div>
  </div>
);

export default CardPokemonComponent;
