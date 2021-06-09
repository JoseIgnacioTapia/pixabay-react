import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import {useState, useEffect} from 'react';

function App() {

  // Guardar busqueda en el componente
  const [busqueda, guardarBusqueda] = useState('');

  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(5);

  // Consultar API cada vez que se modifique la búsqueda
  useEffect(() => {
    
    const consultarAPI = async () => {
      if(busqueda === '') return;
    
      const cantidad = 30;
      const key = '21994889-34ad68a54689efd2fb56f2f36';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${cantidad}&page=${paginaactual}`;
    
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // Calcular el total de páginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / cantidad);
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia el principio
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }

    consultarAPI();
  }, [busqueda, paginaactual])

  // Definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return; 

    guardarPaginaActual(nuevaPaginaActual);
  }

  // Definir pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

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

        { (paginaactual === 1) ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Anterior</button>
        ) }

        { (paginaactual === totalpaginas) ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        ) }
      </div>
    </div>
  );
}

export default App;
