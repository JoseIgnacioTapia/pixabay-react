import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import {useState, useEffect} from 'react';

function App() {

  // Guardar busqueda en el componente
  const [busqueda, guardarBusqueda] = useState('');

  const [imagenes, listadoImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  // Consultar API cada vez que se modifique la búsqueda
  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;
    
      const cantidad = 30;
      const key = '21994889-34ad68a54689efd2fb56f2f36';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${cantidad}`;
    
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      listadoImagenes(resultado.hits);

      // Calcular el total de páginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / cantidad);
      guardarTotalPaginas(calcularTotalPaginas);
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
