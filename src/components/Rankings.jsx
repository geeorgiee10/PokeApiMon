import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from 'react';


export function Rankings() {
  const [ranking, setRanking] = useState([]); 

    
    useEffect(() => { 
    const sacarPuntos = async () => {
            try {
              const consulta = query(collection(db, 'ranking'), orderBy('Puntuacion', 'desc'));
              const consultaPuntosUsuario = await getDocs(consulta);
              
                if(!consultaPuntosUsuario.empty){
                    const rankingsData = [];
                    consultaPuntosUsuario.forEach((doc) => {
                      rankingsData.push({
                        NombreUsuario: doc.data().NombreUsuario,
                        Puntuacion: doc.data().Puntuacion,
                      });
                    });    
                    
                    rankingsData.sort((a, b) => b.Puntuacion - a.Puntuacion);

                    setRanking(rankingsData);
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
            {ranking.map((rank, index)  => 
              (
                <tr key={index}>
                  <td>{rank.NombreUsuario}</td>
                  <td>{rank.Puntuacion}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
  )
}

