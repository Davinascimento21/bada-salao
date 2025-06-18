import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração de caminho atual (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DB_FILE = './banco_simulado.json';

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Funções para ler/escrever o "banco"
const readDB = async () => await fs.readJson(DB_FILE);
const writeDB = async (data) => await fs.writeJson(DB_FILE, data, { spaces: 2 });

// Rota principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Rotas da API (descomente quando quiser usar)
app.get('/servicos', async (req, res) => {
  const db = await readDB();
  res.json(db.servicos);
});

app.get('/profissionais', async (req, res) => {
  const db = await readDB();
  res.json(db.profissionais);
});

app.get('/agendamentos', async (req, res) => {
  const db = await readDB();
  res.json(db.agendamentos);
});

app.post('/agendamentos', async (req, res) => {
  const novo = req.body;
  const db = await readDB();
  db.agendamentos.push(novo);
  await writeDB(db);
  res.status(201).json({ mensagem: 'Agendamento registrado com sucesso' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
