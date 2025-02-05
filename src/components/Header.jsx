import { useState,useEffect } from 'react';

import { BrowserRouter, Routes, Route, Link } from "react-router";
import {Listado} from './Listado.jsx';
import {Juego} from './Juego.jsx';

import { auth } from '../../firebase';
import { onAuthStateChanged, signOut  } from 'firebase/auth';

export function Header() {

  const [estaIniciado, setEstaIniciado] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    // Escuchamos el cambio en el estado de autenticación
    const comprobarInicioSesion = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEstaIniciado(true);
        setNombreUsuario(user.displayName || user.email);
      } else {
        setEstaIniciado(false); 
        setNombreUsuario('');
      }
    });

    return () => comprobarInicioSesion(); 
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth); 
      console.log("Sesión cerrada");
    } 
    catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      
      <nav className="navbar d-flex flex-row align-items-center justify-content-center navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="logo" to="/">
              <span className="navbar-brand" href="#"><img src="/pokemon-23.svg" className="imgLogo" alt="Pokémon" /></span>
            </Link>  
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <Link className="LinkRouter" to="/">
                    <li className="nav-item">
                        <span className="nav-link" aria-current="page" >Inicio</span>
                    </li>
                  </Link>
                  <Link className="LinkRouter" to="/pokemon">
                    <li className="nav-item">
                        <span className="nav-link">Pokémons</span>
                    </li>
                  </Link> 

                  {estaIniciado && (
                      <Link className="LinkRouter" to="/juego">
                        <li className="nav-item">
                          <span className="nav-link">Juegos</span>
                        </li>
                      </Link>
                  )} 

                  {estaIniciado && (
                      <Link className="LinkRouter" to="/ranking">
                        <li className="nav-item">
                          <span className="nav-link">Ranking</span>
                        </li>
                      </Link>
                  )} 


                  {!estaIniciado && (
                    <Link className="LinkRouter" to="/login">
                        <li className="nav-item">
                          <span className="nav-link">Iniciar Sesión</span>
                        </li>
                    </Link> 
                  )} 

                  {estaIniciado && (
                    <li className="nav-item" onClick={cerrarSesion}>
                        <span className="nav-link">Cerrar Sesión</span>
                    </li>
                  )}

                  {estaIniciado && (
                    <li className="nav-item">
                      <span className="nombreUsuario">{nombreUsuario}</span>
                    </li>
                  )}


                  
                </ul>
            </div>
        </div>
      </nav>


    </>
  )
}
