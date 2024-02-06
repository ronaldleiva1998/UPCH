// App.js
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Tabla from './components/Tabla';
import { API_URL } from './apiConfig';

function App() {
  const [filtroGenero, setFiltroGenero] = useState('female');

  const [filtroNacionalidad, setFiltroNacionalidad] = useState('US');

  
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);


  const obtenerDatos = async () => {
    const controller = new AbortController();
  
    try {
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de tiempo de espera
  
      const response = await fetch(`${API_URL}/?results=10&gender=${filtroGenero}&nat=${filtroNacionalidad}`, {
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.results;
    } catch (error) {
      if (controller.signal.aborted) {
        console.log('Solicitud cancelada (timeout):', error);
      } else {
        console.error('Error al obtener datos:', error);
      }
      return [];
    }
  };

  const handleBuscar = async () => {
    try {
      const data = await obtenerDatos();
      console.log('data:', data);
      setShouldUpdateTable(true);
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand mx-auto" href="#">
            <img src="https://logo.clearbit.com/clearbit.com" alt="Logo de la empresa" className="d-inline-block align-text-top" height="30" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div className="container pt-5">

        <div className="row">
          {/* Título de la tabla */}
          <div className="col-sm-12 col-md-6">
            <div className="dt-title">
              <h2>Mi tabla</h2>
            </div>
          </div>

          {/* Botones y filtros */}
          <div className="col-sm-12 col-md-6">
            <div className="d-flex justify-content-end align-items-center">
              <button className="btn btn-sm btn-outline-primary px-4 me-2" id="filtrosBtn">
                <i className="bi bi-sliders"></i> Filtros
              </button>
              <button className="btn btn-sm btn-outline-primary px-4 me-2">
                <i className="bi bi-pencil"></i> Editar
              </button>
              <button className="btn btn-sm btn-outline-danger px-4 me-2">
                <i className="bi bi-trash3"></i> Eliminar
              </button>
            </div>
          </div>
        </div>

        {/* Contenido de filtros */}
        <div className="col-sm-12 mt-4 filtros-content">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="row py-3">
                <div className="form-group col-sm-12 col-lg-4">
                  <div className="input-group">
                    <select
                      className="form-select form-select-sm single-select select-bs"
                      onChange={(e) => setFiltroGenero(e.target.value)}
                      value={filtroGenero}
                    >
                      <optgroup label="GENERO">
                        <option value="female">FEMALE</option>
                        <option value="male">MALE</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className="form-group col-sm-12 col-lg-4">
                  <div className="input-group">
                    <select
                      className="form-select form-select-sm single-select select-bs"
                      onChange={(e) => setFiltroNacionalidad(e.target.value)}
                      value={filtroNacionalidad}
                    >
                      <optgroup label="NACIONALIDAD">
                      <option value="US">US</option>
                      <option value="AU">AU</option>
                      <option value="BR">BR</option>
                      <option value="CH">CH</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-4">
                  <button
                    className="btn btn-sm btn-primary px-4 rounded-3 btn-search"
                    onClick={handleBuscar}
                  >
                    <i className="bi bi-search me-2"></i> Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ... tu código existente ... */}
        <div className="col-sm-12 pt-1">
          <div className="dt-example">
          <Tabla
            obtenerDatos={obtenerDatos}
            filtros={{ genero: filtroGenero, nacionalidad: filtroNacionalidad }}
            shouldUpdateTable={shouldUpdateTable}
            onTableUpdate={() => setShouldUpdateTable(false)} // Callback para indicar que la tabla se ha actualizado
          />

          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
