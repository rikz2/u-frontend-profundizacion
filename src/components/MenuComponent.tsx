// src/components/MenuComponent.tsx
import React from 'react';
import brandImage from '../assets/brand.png';

const MenuComponent: React.FC = () => (
  <nav className="navbar bg-light border-bottom border-body" data-bs-theme="light">
    <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <span>
        <img className='brandImage' src={brandImage} alt="" />
      </span>
      <span>
        Pokedex
      </span>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav p-3">
        <li className="nav-item fw-bold">
          <button className="nav-link" type='button' data-bs-toggle="modal" data-bs-target="#modal_about">
            About
          </button>
        </li>
        <li className="nav-item fw-bold">
          <a className="nav-link" href='#team_selector'>
            Seleccionar equipo
          </a>
        </li>
        <li className="nav-item fw-bold">
          <a className="nav-link" href='#battle_simulator'>
            Simulador de batalla
          </a>
        </li>
        <li className="nav-item fw-bold">
          <a className="nav-link" href='#pokedex'>
            Pokédex
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
);

export default MenuComponent;
