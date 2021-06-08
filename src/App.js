import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import {useState, useEffect} from 'react';

function App() {

  // Guardar busqueda en el componente
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, listadoImagenes] = useState([]);

  // Consultar API cada vez que se modifique la búsqueda
  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;
    
      const cantidad = 10;
      const key = '21994889-34ad68a54689efd2fb56f2f36';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${cantidad}`;
    
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      listadoImagenes(resultado.hits);
    }

    consultarAPI();
  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />
      </div>
    </div>
  );
}

export default App;
