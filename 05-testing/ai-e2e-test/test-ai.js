import { test } from 'node:test';
import assert from 'node:assert';
import OpenAI from 'openai';
import { Stagehand, CustomOpenAIClient } from '@browserbasehq/stagehand'

test('un usuario puede iniciar sesión en SauceDemo y acceder al inventario', async () => {
  const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama',
  });

  const llmClient = new CustomOpenAIClient({
    modelName: 'qwen2.5',
    client: openai,
  });

  const stagehand = new Stagehand({
    env: 'LOCAL',
    llmClient,
  });

  await stagehand.init();
  const page = stagehand.context.pages()[0];

  await page.goto('https://www.saucedemo.com/');

  await stagehand.act('escribe "standard_user" en el campo de nombre de usuario');
  await stagehand.act('escribe "secret_sauce" en el campo de contraseña');
  await stagehand.act('haz clic en el botón "Login"');

  const pageTitle = await page.title();
  assert.strictEqual(pageTitle, 'Swag Labs', `Se esperaba "Swag Labs" pero se obtuvo "${pageTitle}"`);

  await stagehand.close();
})
