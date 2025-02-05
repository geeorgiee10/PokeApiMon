import { useState,useEffect } from 'react';
import StatsChart from './ChartJs';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';



export function Detalle() {

  const { idPokemon } = useParams();
  const [datosPokemon, setDatosPokemon] = useState([]);

  const detailPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`)
      .then(response => response.json())
      .then(datosPokemon => {
        setDatosPokemon([datosPokemon]);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
      if (idPokemon) {
        detailPokemon();
      }
  }, [idPokemon]);


  const mostrarDetalles = datosPokemon.map((datoPokemon) => (
    <div className='w-100 h-100 position-fixed top-0 left-0 z-3 detallesPokemon'>
          <Link className='LinkRouter' to="/pokemon">
            <button  className='btn-close fs-3 m-1'></button>
          </Link>  
            <div className='contenido'>
              <div className='img'>
                <img src={datoPokemon.sprites.other['official-artwork'].front_default} alt={datoPokemon.species.name} className='imgDetalle'/>
              </div>

              <div className='text'>
                  <h1 className='mx-5 nombrePokemon'>{datoPokemon.species.name}</h1>

                  <div className='information'>
                      

                      <div className='typeAbility'>
                        <div className='types'>
                        <h2>Types</h2>
                        <ul>
                        {
                          datoPokemon.types.map((type, i) =>(
                            <li className={type.type.name} key={i}>{type.type.name}</li>
                          ))
                        }
                        </ul>
                        </div>

                        <div className='abilities'>
                        <h2>Abilities</h2>
                        <ul>
                        {
                          datoPokemon.abilities.map((ability, i) =>(
                            <li key={i}>{ability.ability.name}</li>
                          ))
                        }
                        </ul>
                        </div>

                      </div>

                      <div className='stats'>
                        <h2>Stats of {datoPokemon.species.name}</h2>
                        <StatsChart stats={datoPokemon.stats} />
                      </div>
                  </div>
              </div>
              

              

            </div>

            <div className='moves'>
                <h2>Moves</h2>
                <ul className='moves-container'>
                  {
                    
                    datoPokemon.moves.map((move, i) =>(
                      <li key={i}>{move.move.name}</li>
                    ))
                    
                  }
                </ul>
              </div>

        </div>
  ));

  return (
    <>
        
        {mostrarDetalles}

    </>
  )
}

