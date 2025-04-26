import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import EntradaTab from "../../components/dashboard/EntradaTab";
import SalidaTab from "../../components/dashboard/SalidaTab";
import HistorialTab from "../../components/dashboard/HistorialTab";
import ResumenTab from "../../components/dashboard/ResumenTab";

import "./Dashboard.css";

const TABS = [
  { key: "entrada", label: "Entrada" },
  { key: "salida", label: "Salida" },
  { key: "historial", label: "Historial" },
  { key: "resumen", label: "Resumen" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("entrada");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    window.location.replace("/login");
  };

  const tabComponents = {
    entrada: <EntradaTab />,
    salida: <SalidaTab />,
    historial: <HistorialTab />,
    resumen: <ResumenTab />,
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Panel de Control</h1>
        <div className="user-info">
          <p>
            <strong>Usuario:</strong>{" "}
            <span className="info-text">Sebastian Puerta</span>
          </p>
          <p>
            <strong>Rol:</strong> <span className="info-text">Moderador</span>
          </p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      <div className="dashboard-body">
        <nav className="dashboard-sidebar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`sidebar-button ${
                activeTab === tab.key ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="dashboard-content">
          {tabComponents[activeTab]}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
