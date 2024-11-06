// src/App.tsx
import React from 'react';
import MenuComponent from './components/MenuComponent';
import ListPokemonsComponent from './components/ListPokemonsComponent';
import FooterComponent from './components/FooterComponent';
import './styles/main.scss'
import TeamSelector from './components/TeamSelector';
import PresentationSectionComponent from './components/PresentationSectionComponent';

const App: React.FC = () => (
  <div className="App">
    <MenuComponent />
    <PresentationSectionComponent/>
    <TeamSelector/>
    <div className="container my-5">
      <h2 className="text-center">Bienvenido a la Pokédex</h2>
      <ListPokemonsComponent />
    </div>
    <FooterComponent />
    <div className="modal fade" id="modal_about" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Proyecto para la activiadad de profundización el cual implementa como framework React-Vite junto con la aplicación de estilos precopilados mediante SASS.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
