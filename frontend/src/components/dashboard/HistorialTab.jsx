import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./HistorialTab.css";

export default function HistorialTab({ userName }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/api/attendance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(data.history);
      } catch (err) {
        setError(err.response?.data?.error || "Error al cargar el historial");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDuration = (hoursDecimal) => {
    if (hoursDecimal == null) return "-";
    const totalMinutes = Math.round(hoursDecimal * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
  };

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
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
            {history.map((j) => (
              <tr key={j._id}>
                <td>{userName}</td>
                <td>{j.date}</td>
                <td>{j.start}</td>
                <td>{j.end ?? "-"}</td>
                <td>
                  {j.status === "completed" ? formatDuration(j.hours) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
