
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'datatables.net-bs5/js/dataTables.bootstrap5.min';



const Tabla = ({ obtenerDatos, filtros, shouldUpdateTable, onTableUpdate }) => {


    const [datos, setDatos] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await obtenerDatos(); 
            setDatos(data);
            onTableUpdate(); 

          } catch (error) {
            console.error('Error al obtener datos:', error);
          }
        };
    
        if (shouldUpdateTable) {
            fetchData();
          }
        }, [obtenerDatos, filtros, shouldUpdateTable, onTableUpdate]);
      
  
  
  return (
    
    <table className="table table-hover table-light" id="example">
      <thead>
        <tr>
          <th scope="col"><i className="bi bi-check-lg"></i></th>
          <th scope="col">Nombre</th>
          <th scope="col">Genero</th>
          <th scope="col">Correo electrónico</th>
          <th scope="col">Celular</th>
          <th scope="col">Nacionalidad</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item, index) => (
          <tr key={index}>
            <th scope="row">
              <input className="form-check-input" type="checkbox" value="" />
            </th>
            <td>{`${item.name.title} ${item.name.first} ${item.name.last}`}</td>
            <td>{item.gender}</td>
            <td>{item.email}</td>
            <td>{item.cell}</td>
            <td>{item.location.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
