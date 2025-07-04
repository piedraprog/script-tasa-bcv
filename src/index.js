import * as utils from "./helpers/utils.js";
import * as imgCreator from "./helpers/imageCreator.js";
import * as catcher from "./helpers/catchInfo.js";
import fs from "fs";
import path from "path";

const folderPath = "src/imgs";

async function main() {
  try {
    // Esperar a que se inicialicen todas las capturas
    await Promise.all([
      catcher.catchExchangeRate(),
      catcher.catchBanksRates(),
      catcher.catchInterventionRates(),
    ]);

    // Verificar que el directorio existe
    if (!fs.existsSync(folderPath)) {
      throw new Error(`El directorio ${folderPath} no existe`);
    }

    const files = await fs.promises.readdir(folderPath);

    // Verificar que hay archivos para procesar
    if (files.length === 0) {
      throw new Error(`No hay archivos en el directorio ${folderPath}`);
    }

    // Iterar sobre cada archivo
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      
      // Verificar que el archivo no sea null/undefined
      if (!file) {
        console.warn(`Archivo en índice ${index} es null/undefined, saltando...`);
        continue;
      }

      // Obtener la ruta completa del archivo
      const filePath = path.join(folderPath, file);
      
      // Verificar que el archivo existe antes de procesarlo
      if (!fs.existsSync(filePath)) {
        console.warn(`El archivo ${filePath} no existe, saltando...`);
        continue;
      }

      const data = await utils.getImgData(filePath);

      switch (index) {
        case 0:
          let changeData = utils.parseMoneyChange(data);
          await imgCreator.createImageTypeExchange(changeData);
          break;

        case 1:
          let bankData = utils.parseBankTable(data);
          await imgCreator.createImageInfoRate(bankData);
          break;

        case 2:
          let interventionData = utils.parseIntervention(data);
          await imgCreator.createImageIntervention(interventionData);
          break;

        default:
          break;
      }
    }
  } catch (err) {
    console.error("Error en el proceso principal:", err);
    process.exit(1);
  }
}

// Ejecutar la función principal
main();

