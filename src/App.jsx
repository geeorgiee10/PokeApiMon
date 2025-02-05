import { useState } from 'react';

import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Listado } from './components/Listado.jsx';
import { Juego}  from './components/Juego.jsx';
import { Error404 } from './components/Error404.jsx';
import { Detalle } from './components/Detalle.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { Login } from './components/Login.jsx';
import { RutasProtegidas } from './components/RutasProtegidas.jsx';
import { Rankings } from './components/Rankings.jsx';
import './assets/App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {

  return (
      
      <BrowserRouter>
      <Header /> 
      
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/pokemon" element={<Listado />} />
          <Route path="/detalles/:idPokemon" element={<Detalle />} />
          <Route element={<RutasProtegidas />}>
            <Route path="/juego" element={<Juego />} />
          </Route>
          <Route element={<RutasProtegidas />}>
            <Route path="/ranking" element={<Rankings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      
      <Footer /> 
    </BrowserRouter>
        
      
  )
}

export default App
