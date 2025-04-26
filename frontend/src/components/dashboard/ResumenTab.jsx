import React from "react";
import "./ResumenTab.css";

const ResumenTab = () => (
  <div className="resumen-container">
    <h2 className="resumen-title">Resumen de Horas</h2>
    <div className="table-container">
      <table className="resumen-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Total de Horas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-03-20</td>
            <td>8h 00m</td>
          </tr>
          <tr>
            <td>2024-03-19</td>
            <td>7h 30m</td>
          </tr>
          <tr>
            <td>2024-03-18</td>
            <td>8h 15m</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default ResumenTab;
