import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer';


import Navbar from './Navbar';

function App() {

  const [objeto1, setObjeto1] = useState(null);
  const [objeto2, setObjeto2] = useState(null);
  const [objeto3, setObjeto3] = useState(null);

  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('jwt='))
    ?.split('=')[1];
  console.log(cookieValue)

  var callBackendAPI = async () => {
    const response = await fetch('http://localhost:3030/index/express_backend', {
      headers: { 'Authorization': 'Bearer ' + cookieValue }
    });

    const body = await response.json();
    console.log(body)
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  useEffect(() => {

    if (!cookieValue) {
      window.location.href = 'http://localhost:3030/index.html'
    }

    callBackendAPI()
      .then(res => {
        setObjeto1(res[0]);
        setObjeto2(res[1]);
        setObjeto3(res[2]);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className="App">
      <Navbar />
      <h1 className="titulo">TOP 3 RESTAURANTES</h1>

      <div className="podium">
      <div className="podium-item first-place"  onClick={() => window.location.href = 'http://localhost:3030/restaurantes.html'}>
        <h1>{objeto2 && objeto2.nombre}</h1>
          <div className="place-details">
            <p className="place-info">Valoraciones: {objeto2 && objeto2.valoraciones.numValoraciones}</p>
            <p className="place-info">Calificación Media: {objeto2 && objeto2.valoraciones.calificacionMedia}</p>
          </div>
        </div>

        <div className="podium-item second-place">
        <h1>{objeto3 && objeto3.nombre}</h1>
          <div className="place-details">
            <p className="place-info">Valoraciones: {objeto3 && objeto3.valoraciones.numValoraciones}</p>
            <p className="place-info">Calificación Media: {objeto3 && objeto3.valoraciones.calificacionMedia}</p>
          </div>
        </div>
   
        <div className="podium-item third-place">
          <h1>{objeto1 && objeto1.nombre}</h1>
          <div className="place-details">
            <p className="place-info">Valoraciones: {objeto1 && objeto1.valoraciones.numValoraciones}</p>
            <p className="place-info">Calificación Media: {objeto1 && objeto1.valoraciones.calificacionMedia}</p>
          </div>
        </div>

        
      </div>
      <Footer />
    </div>
  );
}

export default App;
