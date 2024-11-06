// src/models/PokemonModel.tsx
export default interface Pokemon {
  name: string;
  url: string;
  stats?: { name: string; base_stat: number }[]; // Agrega la propiedad opcional 'stats'
}
