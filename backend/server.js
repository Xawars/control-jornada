const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB", err);
    process.exit(1);
  });

// rutas
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const attendanceRoutes = require("./routes/attendance");
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Testing..." });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 400;
  res.status(status).json({ error: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// generar password
const bcrypt = require("bcryptjs");

// asesor password
bcrypt.hash("password123", 10).then(console.log);
// moderador password
bcrypt.hash("password321", 10).then(console.log);
// supervisor password
bcrypt.hash("password132", 10).then(console.log);
