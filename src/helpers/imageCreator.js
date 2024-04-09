import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";
import moment from "moment";

moment.locale("es");

let outputPath = './output/'

const getNextDay = () => {
  let dateComplete = moment();

    // Verificar si hoy es viernes
    if (dateComplete.day() === 5) { // El día 5 corresponde al viernes (0 es domingo, 1 es lunes, ..., 6 es sábado)
        // Agregar 3 días para saltar el fin de semana
        dateComplete = dateComplete.add(3, 'days');
    } else {
        // Agregar 1 día
        dateComplete = dateComplete.add(1, 'day');
    }

    // Formatear la fecha en el formato deseado
    return dateComplete.format("dddd, DD [de] MMMM YYYY");
}

export const createImageTypeExchange = async (jsonData) => {
  try {

    let fecha = getNextDay();

    let date_capitalized = fecha.charAt(0).toUpperCase() + fecha.slice(1);
    let imagePath = "src/templates/tipo_cambio.png";
    // Cargar la imagen existente
    const image = await loadImage(imagePath);

    // Configurar el lienzo con las dimensiones de la imagen existente
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");

    // Dibujar la imagen existente en el lienzo
    context.drawImage(image, 0, 0, image.width, image.height);

    // Escribir la información en el lienzo
    context.fillStyle = "#00000"; // Color de texto negro
    context.font = "bold 54px Calibri"; // Tamaño y tipo de fuente
    context.textAlign = "right";

    // Posición para escribir la información en la imagen
    let x = 1160;
    let y = 776;

    // Escribir cada fila de datos en la imagen
    jsonData.forEach((data) => {
      context.fillText(`${data.rate}`, x, y);
      // Ajustar la posición vertical para la siguiente fila de datos
      y += 86;
    });

    const context_date = canvas.getContext("2d");
    context.fillStyle = "#00000"; // Color de texto negro
    context.font = "36px Calibri"; // Tamaño y tipo de fuente
    context.textAlign = "left";
    let date_x = 633;
    let date_y = 1275;

    context_date.fillText(date_capitalized, date_x, date_y);

    // Guardar la imagen con la información escrita
    const out = fs.createWriteStream( outputPath + "tasa_1.png"); // Nombre del archivo de salida (ajusta según tus preferencias)
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
      console.log("tasa 1 tipo de cambio: src/resultados/tasa_1.png");
    });

  } catch (error) {
    console.error("Error al escribir la información en la tipo de cambio referencia:", error);
  }
};

export const createImageInfoRate = async(jsonData) => {
  try {
    let fecha = moment().format("DD/MM/YYYY");
    let imagePath = "src/templates/tasa_informativa.png";
    // Cargar la imagen existente
    const image = await loadImage(imagePath);

    // Configurar el lienzo con las dimensiones de la imagen existente
    const canvas = createCanvas(image.width, image.height);
    const context_bank = canvas.getContext("2d");
    const context_rate = canvas.getContext("2d");


    // Dibujar la imagen existente en el lienzo
    context_bank.drawImage(image, 0, 0, image.width, image.height);

    // Escribir la información en el lienzo
    context_bank.fillStyle = "#1F497D"; // Azul marino
    context_bank.font = "bold 47px Calibri"; // Tamaño y tipo de fuente
    context_bank.textAlign = "left";
    
    // Posición para escribir la información en la imagen
    let x = 53;
    let y = 690;
    
    // Escribir cada fila de datos en la imagen
    jsonData.forEach((data) => {
      context_bank.fillText(`${data.bank}`, x, y);
      y += 91;
    });


    context_rate.font = "bold 47px Calibri"
    context_rate.fillStyle = "#000000"; // Color de texto negro
    y = 690;
    jsonData.forEach((data) => {
      context_rate.fillText(`${data.purchase}`, x + 720, y);
      context_rate.fillText(`${data.sale}`, x + 1070, y);

      // Ajustar la posición vertical para la siguiente fila de datos
      y += 91;
    });

    const context_date = canvas.getContext("2d");
    context_date.fillStyle = "#000000"; // Color de texto negro
    context_date.font = "36px Calibri"; // Tamaño y tipo de fuente
    context_date.textAlign = "left";
    let date_x = 804;
    let date_y = 1303;

    context_date.fillText(fecha, date_x, date_y);

    // Guardar la imagen con la información escrita
    const out = fs.createWriteStream(outputPath + "tasa_2.png"); // Nombre del archivo de salida (ajusta según tus preferencias)
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
      console.log("tasa 2 Tasas informativas: src/resultados/tasa_2.png");
    });

  } catch (error) {
    console.error("Error al escribir la información en la tasa informativa5:", error);
  }
}

export const createImageIntervention = async(jsonData) => {
  try {

    let fecha = moment(jsonData.date,"DD-MM-YYYY" ).format("DD/MM/YYYY");
    let imagePath = "src/templates/intervencion_cambiaria.png";
    const image = await loadImage(imagePath);

    // Configurar el lienzo con las dimensiones de la imagen existente
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    const context_week = canvas.getContext("2d");
    const context_date = canvas.getContext("2d");

    // Dibujar la imagen existente en el lienzo
    context.drawImage(image, 0, 0, image.width, image.height);

    // Escribir la información en el lienzo
    context.fillStyle = "#000000"; 
    context.font = "bold 125px Calibri"; 
    context.fillText(`${jsonData.rate}`, 559, 912);
    

    context_week.fillStyle = "#1F497D"; 
    context_week.font = "41px Calibri"; 
    context_week.fillText(`${jsonData.week}`, 876, 493);

    context_date.fillStyle = "#000000";
    context_date.font = "39px Calibri"; 
    context_date.fillText(`${fecha}`, 793, 1243);
    

    // Guardar la imagen con la información escrita
    const out = fs.createWriteStream(outputPath + "tasa_3.png"); // Nombre del archivo de salida (ajusta según tus preferencias)
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
      console.log("tasa 3, intervencion cambiaria: src/resultados/tasa_3.png");
      // Envía un mensaje cuando todo el proceso haya terminado
      console.log("Proceso completo. ");
      process.exit();
    });

  } catch (error) {
    console.error("Error al escribir la información en la intervencion cambiaria, referencia:", error);
  }
}

