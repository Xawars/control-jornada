const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.json({ message: 'Testing...' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// generar password
const bcrypt = require('bcryptjs');

// asesor password
bcrypt.hash('password123', 10).then(console.log)
// moderador password
bcrypt.hash('password321', 10).then(console.log)
// supervisor password
bcrypt.hash('password132', 10).then(console.log)