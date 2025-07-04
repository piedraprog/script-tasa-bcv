import puppeteer from "puppeteer";

const browserOptions = {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ]
};

const pageOptions = {
  waitUntil: 'networkidle2',
  timeout: 60000 // 60 segundos
};

// Obtener la ruta absoluta del directorio del script actual
export const catchExchangeRate = async () => {
  const url = "https://www.bcv.org.ve/tasas-informativas-sistema-bancario";
  const selectors = [
    "body > div.main-container.container",
    ".main-container.container",
    "div.main-container",
    ".main-container",
    "body > div.container",
    ".container"
  ];

  const rutaCaptura = 'src/imgs/00.png';

  const x = 936; // Coordenada x del punto de inicio del recorte
  const y = 205; // Coordenada y del punto de inicio del recorte
  const width = 200; // Ancho del área de recorte
  const height = 180; // Alto del área de recorte
  
  let browser;
  
  try {
    browser = await puppeteer.launch(browserOptions);
    const page = await browser.newPage();
    
    // Configurar user agent para evitar bloqueos
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    
    console.log('Navegando a:', url);
    await page.goto(url, pageOptions);

    // Intentar con múltiples selectores
    let elemento = null;
    let selector = null;
    
    for (const sel of selectors) {
      try {
        console.log(`Intentando selector: ${sel}`);
        await page.waitForSelector(sel, { timeout: 10000 });
        elemento = await page.$(sel);
        if (elemento) {
          selector = sel;
          console.log(`Selector encontrado: ${sel}`);
          break;
        }
      } catch (err) {
        console.log(`Selector ${sel} no encontrado, probando siguiente...`);
        continue;
      }
    }

    if (!elemento) {
      // Si no encontramos el selector, intentar tomar captura de toda la página
      console.log('No se encontró ningún selector específico, tomando captura de toda la página');
      await page.screenshot({
        path: rutaCaptura,
        clip: {
          x: x,
          y: y,
          width: width,
          height: height,
        },
      });
      return;
    }

    // Obtener las dimensiones y la posición del elemento seleccionado
    const dimensiones = await elemento.boundingBox();
    
    if (!dimensiones) {
      throw new Error('No se pudieron obtener las dimensiones del elemento');
    }

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

    console.log(`Captura guardada en: ${rutaCaptura}`);

  } catch (error) {
    console.error('Error en catchExchangeRate:', error.message);
    // Intentar una captura básica como fallback
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.screenshot({
        path: rutaCaptura,
        clip: { x: 936, y: 205, width: 200, height: 180 }
      });
      console.log('Captura de fallback guardada');
    } catch (fallbackError) {
      console.error('Error en captura de fallback:', fallbackError.message);
      throw error;
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const catchBanksRates = async () => {
  const url = "https://www.bcv.org.ve/tasas-informativas-sistema-bancario";
  const selectors = [
    "#block-system-main > div > div.view-content > div > table",
    "table",
    ".view-content table",
    "#block-system-main table"
  ];
  
  const rutaCaptura = "./src/imgs/01.png";

  const x = 0;
  const y = 0;
  const width = 750;
  const height = 180;
  
  let browser;
  
  try {
    browser = await puppeteer.launch(browserOptions);
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    
    console.log('Navegando a:', url);
    await page.goto(url, pageOptions);

    let elemento = null;
    
    for (const sel of selectors) {
      try {
        console.log(`Intentando selector: ${sel}`);
        await page.waitForSelector(sel, { timeout: 10000 });
        elemento = await page.$(sel);
        if (elemento) {
          console.log(`Selector encontrado: ${sel}`);
          break;
        }
      } catch (err) {
        console.log(`Selector ${sel} no encontrado, probando siguiente...`);
        continue;
      }
    }

    if (!elemento) {
      console.log('No se encontró tabla, tomando captura de área específica');
      await page.screenshot({
        path: rutaCaptura,
        clip: { x: 0, y: 400, width: 750, height: 180 }
      });
      return;
    }

    const dimensiones = await elemento.boundingBox();
    
    if (!dimensiones) {
      throw new Error('No se pudieron obtener las dimensiones del elemento');
    }

    await page.screenshot({
      path: rutaCaptura,
      clip: {
        x: dimensiones.x + x,
        y: dimensiones.y + y,
        width: width,
        height: height,
      },
    });

    console.log(`Captura guardada en: ${rutaCaptura}`);

  } catch (error) {
    console.error('Error en catchBanksRates:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const catchInterventionRates = async () => {
  const url = "https://www.bcv.org.ve/politica-cambiaria/intervencion-cambiaria";
  const selectors = [
    "#block-system-main > div > div.view-content > div > table",
    "table",
    ".view-content table",
    "#block-system-main table"
  ];
  
  const rutaCaptura = "./src/imgs/02.png";

  const x = 0;
  const y = 0;
  const width = 800;
  const height = 58;
  
  let browser;
  
  try {
    browser = await puppeteer.launch(browserOptions);
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    
    console.log('Navegando a:', url);
    await page.goto(url, pageOptions);

    let elemento = null;
    
    for (const sel of selectors) {
      try {
        console.log(`Intentando selector: ${sel}`);
        await page.waitForSelector(sel, { timeout: 10000 });
        elemento = await page.$(sel);
        if (elemento) {
          console.log(`Selector encontrado: ${sel}`);
          break;
        }
      } catch (err) {
        console.log(`Selector ${sel} no encontrado, probando siguiente...`);
        continue;
      }
    }

    if (!elemento) {
      console.log('No se encontró tabla, tomando captura de área específica');
      await page.screenshot({
        path: rutaCaptura,
        clip: { x: 0, y: 300, width: 800, height: 58 }
      });
      return;
    }

    const dimensiones = await elemento.boundingBox();
    
    if (!dimensiones) {
      throw new Error('No se pudieron obtener las dimensiones del elemento');
    }

    await page.screenshot({
      path: rutaCaptura,
      clip: {
        x: dimensiones.x + x,
        y: dimensiones.y + y,
        width: width,
        height: height,
      },
    });

    console.log(`Captura guardada en: ${rutaCaptura}`);

  } catch (error) {
    console.error('Error en catchInterventionRates:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
