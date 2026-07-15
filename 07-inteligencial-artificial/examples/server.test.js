const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');

const projectDir = path.join(__dirname);
const baseUrl = 'http://127.0.0.1:3100';
let serverProcess;

async function waitForServer() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      // Esperar a que el servidor arranque
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('El servidor no arrancó a tiempo');
}

test.before(async () => {
  serverProcess = spawn(process.execPath, ['server.js'], {
    cwd: projectDir,
    env: { ...process.env, PORT: '3100' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  serverProcess.stdout.on('data', (data) => process.stdout.write(`[server] ${data}`));
  serverProcess.stderr.on('data', (data) => process.stderr.write(`[server-error] ${data}`));

  await waitForServer();
});

test.after(async () => {
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill('SIGTERM');
  }
});

test('GET /api/jobs devuelve una lista de trabajos', async () => {
  const response = await fetch(`${baseUrl}/api/jobs`);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.ok(Array.isArray(data.jobs));
  assert.ok(data.jobs.length > 0);
});

test('POST /api/auth/login devuelve un token', async () => {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@jobs.com', password: '123456' })
  });

  assert.equal(response.status, 200);
  const data = await response.json();
  assert.ok(data.token);
  assert.equal(data.user.email, 'admin@jobs.com');
});

test('POST /api/jobs crea un trabajo cuando hay sesión activa', async () => {
  const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@jobs.com', password: '123456' })
  });
  const loginData = await loginResponse.json();

  const response = await fetch(`${baseUrl}/api/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginData.token}`
    },
    body: JSON.stringify({
      title: 'Senior Backend Developer',
      company: 'OpenAI-like',
      location: 'Remote',
      salary: '70k-90k',
      description: 'Backend role for a modern platform',
      category: 'backend',
      remote: true
    })
  });

  assert.equal(response.status, 201);
  const data = await response.json();
  assert.equal(data.job.title, 'Senior Backend Developer');
});
