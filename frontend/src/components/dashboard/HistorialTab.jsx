import React from "react";
import "./HistorialTab.css";

const HistorialTab = () => (
  <div className="historial-container">
    <h2 className="historial-title">Historial de Jornadas</h2>
    <div className="table-container">
      <table className="historial-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Día</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Tiempo Laborado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sebastian Puerta</td>
            <td>2024-03-20</td>
            <td>09:00</td>
            <td>18:00</td>
            <td>8h 00m</td>
          </tr>
          <tr>
            <td>Sebastian Puerta</td>
            <td>2024-03-19</td>
            <td>09:15</td>
            <td>17:45</td>
            <td>7h 30m</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default HistorialTab;
