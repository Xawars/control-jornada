import React, { useState } from "react";
import { FaCheckCircle, FaRegClock } from "react-icons/fa";
import api from "../../services/api";
import "./EntradaTab.css";

const EntradaTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [punchInTime, setPunchInTime] = useState("");

  const handlePunchIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      setPunchInTime("");

      const token = localStorage.getItem("token");
      console.log("Token from EntradaTab.jsx: ", token);
      const { data } = await api.post(
        "/api/attendance/punch-in",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(data.message);

      const now = new Date();
      const [day, month, year] = now
        .toLocaleDateString("es-CO", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .split(" de ");
      const capMonth = month.charAt(0).toUpperCase() + month.slice(1);
      const formattedDate = `${day} de ${capMonth} de ${year}`;
      const timePart = now.toLocaleTimeString("es-CO", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      setPunchInTime(`${formattedDate} a las ${timePart}`);
    } catch (err) {
      let errorMsg = "Error al marcar la entrada";
      if (err.response && err.response.data && err.response.data.error) {
        errorMsg = err.response.data.error;
      } else if (err.response && typeof err.response.data === "string") {
        errorMsg = err.response.data;
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="entrada-container">
      <h2 className="entrada-title">Fichar Entrada</h2>
      <button
        className="entrada-button"
        onClick={handlePunchIn}
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Marcar Entrada"}
      </button>
      <div className="entrada-messages" aria-live="polite">
        {error && <p className="error-message">{error}</p>}
        {success && (
          <div className="success-block">
            <span className="success-icon">
              <FaCheckCircle />
            </span>
            <p className="success-message">{success}</p>
            {punchInTime && (
              <div className="time-message-block">
                <span className="clock-icon">
                  <FaRegClock />
                </span>
                <span className="time-message">{punchInTime}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EntradaTab;
