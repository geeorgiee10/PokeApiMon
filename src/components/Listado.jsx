import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router";

import { Detalle } from './Detalle.jsx';

export function Listado() {

  const [data, setData] = useState([]);
  const [dataPropio, setDataPropio] = useState([]);
  const [offset, setOffset] = useState(0);
  const [detalles, setDetalles] = useState(null);


  const cargar = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setData(prevData => [...data.results]); 
        setOffset(prevOffset => prevOffset + 8);
      })
      .catch(error => console.error('Error:', error));
  };

    useEffect(() => {
      cargar();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
          data.forEach(pokemon => {
            fetch(pokemon.url)
              .then(response => response.json())
              .then(dataPropio => {
                setDataPropio(prevState => [...prevState, dataPropio]); 
              })
              .catch(error => console.error('Error al obtener el Pokémon:', error));
          });
        }
      }, [data]); 


    const mostrar = dataPropio.map((datoPropio) =>(

        <div key={datoPropio.id} className='card m-auto'>
            <img className='imgCard' src={datoPropio.sprites.other['official-artwork'].front_default} alt={datoPropio.species.name}/>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">{datoPropio.species.name}</h5>
                <Link className="LinkRouter" to={`/detalles/${datoPropio.id}`}>
                  <a className="btn btn-primary">Ver más</a>
                </Link>
            </div>
        </div>
            
    ));

    

    return (
      <>
        <div className='contenedor d-flex flex-row align-items-center justify-conter-center gap-3 flex-wrap w-100 z-2'>

          {mostrar}
          
          <button className='btnCargar' onClick={cargar}>Cargar más Pokémons</button>

        </div>

      </>
    )
  }
  


