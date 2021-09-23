const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'umg'
});

// Route
app.get('/', (req, res) => {
  res.send('Bienvenido a la API UMG');
});

// Recupera todas las sedes
app.get('/apiumg/public/sede', (req, res) => {
  const sql = 'SELECT * FROM sede';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Sin resultados');
    }
  });
});

//Recupera a la sede en base al id
app.get('/apiumg/public/sede/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM sede WHERE idsede = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Sin resultados');
    }
  });
});


// Recupera a todos los estudiantes
app.get('/apiumg/public/estudiante', (req, res) => {
    const sql = 'SELECT * FROM estudiante';
  
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('Sin resultados');
      }
    });
  });
  
app.delete('/apiumg/public/estudiante/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM estudiante WHERE idestudiante= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Estudiante eliminado');
  });
});

// Revisar si la conexion funciona
connection.connect(error => {
  if (error) throw error;
  console.log('Servidor listo');
});

app.listen(PORT, () => console.log(`Servidor ejecutandose en el puerto: ${PORT}  PID:`+process.pid));