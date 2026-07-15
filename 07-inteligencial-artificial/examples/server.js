const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'InfoJobs',
    location: 'Madrid',
    salary: '45k-60k',
    description: 'Desarrollo de interfaces modernas con React.',
    category: 'frontend',
    remote: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'TechHub',
    location: 'Barcelona',
    salary: '55k-70k',
    description: 'Diseño de APIs y servicios escalables.',
    category: 'backend',
    remote: false,
    createdAt: new Date().toISOString()
  }
];

const users = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@jobs.com',
    password: '123456'
  }
];

const sessions = new Map();

function getUserFromToken(token) {
  return sessions.get(token);
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !getUserFromToken(token)) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  req.user = getUserFromToken(token);
  next();
}

app.get('/', (req, res) => {
  res.json({
    message: 'API de empleos activa',
    endpoints: ['/api/health', '/api/jobs', '/api/auth/login', '/api/auth/logout']
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: 'Servidor funcionando correctamente'
  });
});

app.get('/api/jobs', (req, res) => {
  res.json({
    jobs,
    total: jobs.length
  });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find((item) => item.id === Number(req.params.id));

  if (!job) {
    return res.status(404).json({ error: 'Trabajo no encontrado' });
  }

  res.json({ job });
});

app.post('/api/jobs', authMiddleware, (req, res) => {
  const { title, company, location, salary, description, category, remote } = req.body;

  if (!title || !company || !description) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const newJob = {
    id: jobs.length ? jobs[jobs.length - 1].id + 1 : 1,
    title,
    company,
    location: location || 'Remoto',
    salary: salary || 'No especificado',
    description,
    category: category || 'general',
    remote: Boolean(remote),
    createdAt: new Date().toISOString(),
    createdBy: req.user.email
  };

  jobs.push(newJob);
  res.status(201).json({ message: 'Trabajo creado correctamente', job: newJob });
});

app.put('/api/jobs/:id', authMiddleware, (req, res) => {
  const jobIndex = jobs.findIndex((item) => item.id === Number(req.params.id));

  if (jobIndex === -1) {
    return res.status(404).json({ error: 'Trabajo no encontrado' });
  }

  jobs[jobIndex] = {
    ...jobs[jobIndex],
    ...req.body,
    id: jobs[jobIndex].id,
    updatedAt: new Date().toISOString()
  };

  res.json({ message: 'Trabajo actualizado', job: jobs[jobIndex] });
});

app.delete('/api/jobs/:id', authMiddleware, (req, res) => {
  const jobIndex = jobs.findIndex((item) => item.id === Number(req.params.id));

  if (jobIndex === -1) {
    return res.status(404).json({ error: 'Trabajo no encontrado' });
  }

  const [deletedJob] = jobs.splice(jobIndex, 1);
  res.json({ message: 'Trabajo eliminado', job: deletedJob });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = `token-${user.id}-${Date.now()}`;
  sessions.set(token, user);

  res.json({
    message: 'Inicio de sesión correcto',
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.post('/api/auth/logout', authMiddleware, (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (token) {
    sessions.delete(token);
  }

  res.json({ message: 'Sesión cerrada correctamente' });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: { id: req.user.id, name: req.user.name, email: req.user.email } });
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalJobs: jobs.length,
    categories: [...new Set(jobs.map((job) => job.category))],
    remoteJobs: jobs.filter((job) => job.remote).length
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
