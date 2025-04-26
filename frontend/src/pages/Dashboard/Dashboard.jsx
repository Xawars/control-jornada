import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import { FiLogOut } from "react-icons/fi";

import EntradaTab from "../../components/dashboard/EntradaTab";
import SalidaTab from "../../components/dashboard/SalidaTab";
import HistorialTab from "../../components/dashboard/HistorialTab";
import ResumenTab from "../../components/dashboard/ResumenTab";

import shiftLogo from "../../assets/shift.png";
import avatarLogo from "../../assets/boy.png";
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

  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ name: data.name, role: data.role });
      } catch {
        navigate("/login", { replace: true });
        window.location.replace("/login");
      }
    })();
  }, [navigate]);

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
        <div className="header-left">
          <img src={shiftLogo} alt="Logo" className="header-logo" />
          <h1 className="dashboard-title">Panel de control</h1>
        </div>

        <div className="header-right">
          <div className="user-menu">
            <img src={avatarLogo} alt="Avatar" className="avatar" />
            <div className="user-info">
              <span className="username">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              <FiLogOut />
            </button>
          </div>
        </div>
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
