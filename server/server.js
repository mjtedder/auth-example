const express = require('express');
const app = express();
const authRoutes = require('./routes//api/authRoutes');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`))