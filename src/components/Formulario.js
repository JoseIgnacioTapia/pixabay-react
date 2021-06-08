import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

  // Guardar categoría buscada
  const [termino, guardarTermino] = useState('');
  const [error, guardarError] = useState(false);

  // Validar formulario y enviar el termino al componente principal
  const validarFormulario = e => {
    e.preventDefault();
    // Validar
    if (termino.trim() === '') {
      guardarError(true);
      return;
    }
    guardarError(false);

    // Enviar el termino a App.js
    guardarBusqueda(termino);
  }

  return (
    <form
      onSubmit={validarFormulario}
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input 
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: futbol o café"
            onChange={e => guardarTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input 
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>

      { error ? <Error mensaje="El campo no puede estar vacío" /> : null }
    </form> 
  );
}
 
export default Formulario;