import puppeteer from "puppeteer";

// Obtener la ruta absoluta del directorio del script actual
export const catchExchangeRate = async () => {

  const url = "https://www.bcv.org.ve/tasas-informativas-sistema-bancario";
  const selector = "body > div.main-container.container";

  const rutaCaptura = 'src/imgs/00.png';

  const x = 936; // Coordenada x del punto de inicio del recorte
  const y = 205; // Coordenada y del punto de inicio del recorte
  const width = 200; // Ancho del área de recorte
  const height = 180; // Alto del área de recorte
  const browser = await puppeteer.launch(); // Iniciar el navegador
  const page = await browser.newPage(); // Abrir una nueva página

  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.goto(url); // Ir a la URL especificada

  // Esperar a que el selector esté presente en la página
  await page.waitForSelector(selector);

  // Obtener las dimensiones y la posición del elemento seleccionado
  const elemento = await page.$(selector);
  const dimensiones = await elemento.boundingBox();
1
  // Tomar una captura de pantalla solo de la parte específica de la página
  await page.screenshot({
    path: rutaCaptura,
    clip: {
      x: dimensiones.x + x,
      y: dimensiones.y + y,
      width: width,
      height: height,
    },
  });

  await browser.close(); // Cerrar el navegador
};

export const catchBanksRates = async () => {
  // Ejemplo de uso
  const url = "https://www.bcv.org.ve/tasas-informativas-sistema-bancario";
  const selector = "#block-system-main > div > div.view-content > div > table";
  // const selector = '#block-views-47bbee0af9473fcf0d6df64198f4df6b > div > div.view-content > div';
  const rutaCaptura = "./src/imgs/01.png"; // Ruta donde quieres guardar la captura

  const x = 0; // Coordenada x del punto de inicio del recorte
  const y = 0; // Coordenada y del punto de inicio del recorte
  const width = 750; // Ancho del área de recorte
  const height = 180; // Alto del área de recorte
  const browser = await puppeteer.launch(); // Iniciar el navegador
  const page = await browser.newPage(); // Abrir una nueva página

  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.goto(url); // Ir a la URL especificada

  // Esperar a que el selector esté presente en la página
  await page.waitForSelector(selector);

  // Obtener las dimensiones y la posición del elemento seleccionado
  const elemento = await page.$(selector);
  const dimensiones = await elemento.boundingBox();

  // Tomar una captura de pantalla solo de la parte específica de la página
  await page.screenshot({
    path: rutaCaptura,
    clip: {
      x: dimensiones.x + x,
      y: dimensiones.y + y,
      width: width,
      height: height,
    },
  });

  await browser.close(); // Cerrar el navegador
};

export const catchInterventionRates = async () => {
  // Ejemplo de uso
  const url = "https://www.bcv.org.ve/politica-cambiaria/intervencion-cambiaria";
  const selector = "#block-system-main > div > div.view-content > div > table";
  // const selector = '#block-views-47bbee0af9473fcf0d6df64198f4df6b > div > div.view-content > div';
  const rutaCaptura = "./src/imgs/02.png"; // Ruta donde quieres guardar la captura

  const x = 0; // Coordenada x del punto de inicio del recorte
  const y = 0; // Coordenada y del punto de inicio del recorte
  const width = 800; // Ancho del área de recorte
  const height = 58; // Alto del área de recorte
  const browser = await puppeteer.launch(); // Iniciar el navegador
  const page = await browser.newPage(); // Abrir una nueva página

  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.goto(url); // Ir a la URL especificada

  // Esperar a que el selector esté presente en la página
  await page.waitForSelector(selector);

  // Obtener las dimensiones y la posición del elemento seleccionado
  const elemento = await page.$(selector);
  const dimensiones = await elemento.boundingBox();

  // Tomar una captura de pantalla solo de la parte específica de la página
  await page.screenshot({
    path: rutaCaptura,
    clip: {
      x: dimensiones.x + x,
      y: dimensiones.y + y,
      width: width,
      height: height,
    },
  });

  await browser.close(); // Cerrar el navegador
};
