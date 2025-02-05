import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from 'react';


export function Rankings() {
    const [puntos, setPuntos] = useState([]);
    const [usuarios, setUsuario] = useState([]);

    
    useEffect(() => { 
    const sacarPuntos = async () => {
            try {
                const consulta = query(collection(db, 'ranking'));
                const consultaPuntosUsuario = await getDocs(consulta);
              
                if(!consultaPuntosUsuario.empty){
                    consultaPuntosUsuario.forEach((doc) => {
                        //console.log(doc.data());
                        setPuntos(prevPuntos => [...prevPuntos, doc.data().Puntuacion]);
                        setUsuario(prevUsuarios => [...prevUsuarios, doc.data().NombreUsuario]);
                    });                
                }
            } 
            catch (error) {
                console.log("Error al obtener la puntuación " + error);
            }
    };

    sacarPuntos();
  }, []);

  return (
      
      <div className="ranking">
        <h2 className="h2Ranking">Ranking de los mejores jugadores</h2>
        <table className="tablaRanking">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Puntuacion</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index)  => 
              (
                <tr key={index}>
                  <td>{usuario}</td>
                  <td>{puntos[index]}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
  )
}

