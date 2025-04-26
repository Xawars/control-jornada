import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./ResumenTab.css";

export default function ResumenTab() {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/api/attendance/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(data.summary);
      } catch (err) {
        setError(err.response?.data?.error || "Error al cargar el resumen");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const formatDuration = (durationStr) => {
    const [h, m, s] = durationStr.split(":");
    return `${parseInt(h, 10)}h ${parseInt(m, 10)}m`;
  };

  if (loading) return <p className="resumen-loading">Cargando resumen...</p>;
  if (error) return <p className="resumen-error">{error}</p>;

  return (
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
            {Object.entries(summary).map(([date, duration]) => (
              <tr key={date}>
                <td>{date}</td>
                <td>{formatDuration(duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
