import * as utils from "./helpers/utils.js";
import * as imgCreator from "./helpers/imageCreator.js";
import * as catcher from "./helpers/catchInfo.js";
import fs from "fs";
import path from "path";

const folderPath = "src/imgs";



Promise.all([
  catcher.catchExchangeRate(),
  catcher.catchBanksRates(),
  catcher.catchInterventionRates(),
])
  .then(async () => {
    try {
      const files = await fs.promises.readdir(folderPath);

      // Iterar sobre cada archivo
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        // Obtener la ruta completa del archivo
        const filePath = path.join(folderPath, file);
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
      console.error("Error al leer la carpeta:", err);
    }
  })
  .catch((error) => console.error("Error al tomar la captura:", error));

