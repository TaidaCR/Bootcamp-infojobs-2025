// @ts-check
import { test, expect } from '@playwright/test';

//1. Lo más recomendable es usar roles, aria
//2. Luego etiquetas de texto
//3. Luego data-testid
//4. Luego selectores css (propensos a cambiar)
test('buscar empleos y aplicar a una oferta', async({page}) => {
  await page.goto('http://localhost:5173/')

  const searchInput = page.locator('input[name="search-job"]')
  await searchInput.fill('React')

  await page.getByRole('button', { name: 'Search' }).click()

  const jobCards = page.locator('.job')

  await expect(jobCards.first()).toBeVisible()

  const firstJobTitle = jobCards.first().locator('h3')
  await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')

  await page.getByRole('button', { name: 'Iniciar sesión' }).click()

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
  await applyButton.click()
  
  page.getByRole('button', { name: 'Aplicado' }).first()
})

//pnpm exec playwright test --ui //Ver como se ejecuta el test
//pnpm exec playwright test --headed //Ver como se ejecutan los test en los navegadores