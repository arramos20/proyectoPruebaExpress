import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import users from "./models";
//import { users } from "./models"; - Para importar sólo los usuarios de "models"

const app = express();
//Una petición idempotente es aquella que sin importar las veces que la ejecute, debe devolver lo mismo (ej: POST, "DELETE")

app.use(cors()); //Nos permite asociar un middleWare a una o todas las rutas. EN el caso de "use", a todos los métodos HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
  {
    id: '1',
    username: 'Claudia Valdivieso',
  },
  {
    id: '2',
    username: 'Carlos Zárate',
  },
];

app.get('/', (req, res) => {
  return res.send('Recibió un método GET'); //Devuelve un 200
});

app.post('/', (req, res) => {
  return res.send('Recibió un método POST');//Devuelve un 201
});

app.put('/', (req, res) => {
  return res.send('Recibió un método PUT');//Devuelve un 200
});

app.delete('/', (req, res) => {
  return res.send('Recibió un método DELETE');
});

app.get("/2dam", (req, res) => {
    res.send("¡Hola Mundo!");
});

//USERS
app.get('/users/:id', (req, res) => {
  return res.json(users[req.params.id-1]);//Filtra por id de usuarios
});

app.get('/users', (req, res) => {//Mostrar usuarios
  //return res.send('Método GET en el recurso usuario');
  return res.json(users);
});

app.post('/users', (req, res) => {//Crear un nuevo usuario
  //return res.send('Método POST en el recurso usuario');
  const nuevoUsuario={
    id: req.body.id,
    username: req.body.username
  }
  return res.status(201).json();
});

app.put('/users/:id', (req, res) => {//Los :variable designan a lo que va después de los : como algo que va dentro de "params"
  return res.send(                  //Put actualiza
    `Método PUT en el recurso usuario/${req.params.id}`,
  );
});

app.delete('/users/:id', (req, res) => {//Borra usuarios
  return res.send(
    `Método DELETE en el recurso usuario/${req.params.id}`,
  );
});

app.listen(process.env.PORT, () =>
  console.log(`¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`)
);