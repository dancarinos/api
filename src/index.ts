import express from 'express';
import cors from 'cors';

import professores from './data/professores.json' assert { type: 'json' };
import { connection } from './db';
import { port } from './env';

const app = express();

app.use(
  cors({
    origin: '*', // aqui deveria estar o link do front-end
    optionsSuccessStatus: 200
  })
);

app.get('/', (_, res) => {
  res.send('Have you ever heard the tragedy of <b>Count Matioli, the Italian</b>?');
});

app.get('/api/professores', (_, res) => {
  res.send(professores.map((professor) => ({ nome: professor })));
});

app.get('/api/echo/:text', (req, res) => {
  res.send(req.params.text);
});

app.get('/api/frutas', async (_, res) => {
  const [rows] = await connection.query('SELECT * FROM testeImport');
  res.send(rows);
});

app.post('/api/trust', (req, res) => {
  
  res.json(req.body);
});

const objetoPog = {
  nome: "Matioli",
  sobrenome: "The Italian",
  idade: 616,
  profissao: "Great-Duke Great-Lord Major Admiral of the Second Legion's forward artillery—cavalry multiplication of Devils."
}

app.get('/api/Matioli', (_, res) => {
  res.send(objetoPog);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

