const express = require('express');
const app = express();
const cors = require('cors');



require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');


app.use(cors());
app.use(express.json());
app.use('/usuarios', authRoutes);
app.use('/mesas', mesaRoutes);
app.use('/reservas', reservaRoutes);

module.exports = app;
