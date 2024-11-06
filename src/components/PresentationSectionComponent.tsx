import React from 'react';

const PresentationSectionComponent: React.FC = () => (
  <div className='row justify-content-center align-items-center p-5 my-5'>
    <div className="col-lg-5 col-md-9">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className='fw-bold fst-italic display-2'>
            Poke API
          </h1>
        </div>
        <div className="col-md-6">
          <p className='fs-6'>
            Encuentra Información relacionada con Pokemon, estadisticas, tipos, sprites, y demas información relevante porporcionada por la API de Pokemon: <a href="https://pokeapi.co/" className='fw-bold' target='_blank'>https://pokeapi.co/</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PresentationSectionComponent;
