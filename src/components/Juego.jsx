import { useState,useEffect } from 'react';
import { collection, addDoc, updateDoc, where, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

export function Juego() {
    const [number, setNumber] = useState(Math.floor(Math.random() * 1025) + 1);
    const [data, setData] = useState([]);
    const [nombrePokemon, setNombrePokemon] = useState('');  
    const [resultado, setResultado] = useState(false);
    const [intentos, setIntentos] = useState(0);
    const [acertado, setAcertado] = useState(3);
    const [puntos, setPuntos] = useState(0);
    const [usuario, setUsuario] = useState(null);


    useEffect(() => {
        const auth = getAuth();
        setUsuario(auth.currentUser); 
    }, []); 

    const pokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`)
          .then(response => response.json())
          .then(data => {
            setData([data]);
            setResultado(false);
            setIntentos(0);
            setAcertado(3);
            setPuntos(0);
          })
          .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        pokemon();
    }, [number]);

    const mostrar = data.map((dato) =>(
        <div key={dato.id} className='card m-auto'>
            <img className='imgCard' src={dato.sprites.other['official-artwork'].front_default} alt="Pokémon"/>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">{dato.species.name}</h5>
                <h3>Puntos: {puntos}</h3>
            </div>
        </div>      
    ));

    const adivinar = data.map((dato) =>(
        <div key={dato.id} className='card m-auto'>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="types-container">
                {dato.types.map((tipo, index) => (
                        <span key={index} className="badge bg-primary mx-1">{tipo.type.name}</span>
                ))}
                </div>

                {intentos >= 1 && (
                    <div className="additional-field mt-3">
                        <span className="badge bg-primary mx-1">Pokedex number: {dato.id}</span>
                    </div>
                )}

                {intentos >= 2 && (
                    <div className="additional-field mt-3">
                        <img className='imgCardOculto' src={dato.sprites.other['official-artwork'].front_default} alt={dato.species.name}/>
                    </div>
                )}
            </div>
        </div>      
    ));

    const almacenarPuntuacion = async () => {

        try {
            const consulta = query(collection(db, 'ranking'), where("Usuario", "==", usuario.uid));
            const consultaPuntosUsuario = await getDocs(consulta);

            consultaPuntosUsuario.forEach((doc) => {
                const nuevosPuntos = doc.data().Puntuacion || 0;
                    updateDoc(doc.ref, {
                        Puntuacion: nuevosPuntos + puntos
                    });
            });
                          
            
        } 
        catch (error) {
            console.log("Error al guardar la puntuación " + error);
        }
    };

    const handleChange = (event) => {
        setNombrePokemon(event.target.value);  
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            comprobar();  
            setNombrePokemon(''); 
        }
    };
    const clickButton = (event) => {
            event.preventDefault();
            comprobar();  
            setNombrePokemon(''); 
    };

    function comprobar(){

        data.forEach((dato) => {

            if(nombrePokemon.toLowerCase() === dato.species.name.toLowerCase()){
                setResultado(true);
                setAcertado(1);

                setPuntos((prevPuntos) => {
                    if (intentos === 0) return prevPuntos + 10;
                    else if (intentos === 1) return prevPuntos + 5;
                    else if (intentos === 2) return prevPuntos + 3;
                    return prevPuntos;
                });
            }
            else if(intentos == 2){
                setResultado(true);
                setAcertado(2);
                setPuntos(0);
            }
            else{
                setIntentos(intentos + 1);
                setAcertado(3);
            }
        });
    }

    const jugarOtraVez = () => {
        setNumber(Math.floor(Math.random() * 1025) + 1);
    };

    useEffect(() => {
        almacenarPuntuacion(); 
    }, [puntos]);
        
  return (
    <>
        <div className='juego w-100 mt-5 p-3'>

        {
            acertado === 1 ? (
                <h2>¡Enhorabuena! Has ganado</h2> 
            ) : acertado === 3 ? (
                <h2>Adivina el Pokémon</h2>  
            ) : acertado === 2 ? (
                <h2>¡Has fallado! Intentalo de nuevo</h2> 
            ) : null 
        }

            {resultado ? (
                data.length > 0 && (
                    mostrar
                )
            ) : (
                data.length > 0 && (
                    adivinar
                )
            )}

            {!resultado && (
                <form className='form'>
                    <label htmlFor="inputNombre" className='labelForm'>Introduce el nombre del Pokémon</label>
                    <input type="text" name="inputNombre" id="inputNombre" className='inputForm' value={nombrePokemon} onChange={handleChange}  onKeyDown={handleKeyDown}/>
                    <button className='btn-secondary' onClick={clickButton}>Comprobar</button>
                </form>
            )}
                
            <button className='btn-primary btnJuego fs-2' onClick={jugarOtraVez}>Jugar de nuevo</button>
        </div>
    </>
  )
}

