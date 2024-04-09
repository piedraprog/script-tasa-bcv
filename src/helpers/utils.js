import fs from "fs";

import { createWorker } from "tesseract.js";
const worker = await createWorker("spa");

// LIMPIAR LA INFO DE LA PRIMERA IMAGEN
export const parseMoneyChange = (data) => {
  return data
    .trim()
    .split("\n")
    .map((line) => {
      const [currency, rate] = line.split(" ");
      return { currency, rate };
    });
};

// LIMPIAR LA INFO DE LA SEGUNDA IMAGEN
export const getBankName = (rowData) => {
  const elementos = rowData.split(" ");
  elementos.shift();
  elementos.splice(-2);
  let bankName = elementos.join(" ");

  return bankName;
};

export const parseBankTable = (bankData) => {
  const rows = bankData.trim().split("\n").slice(1);

  return rows.map((row) => {
    // Utilizamos una expresión regular para dividir la fila en valores, considerando cualquier secuencia de caracteres no espaciados
    const values = row.match(/\S+/g);
    return {
      bank: getBankName(row),
      purchase: values[values.length - 2], // El penúltimo valor es el de compra
      sale: values[values.length - 1], // El último valor es el de venta
    };
  });
};

export const parseIntervention = (interventionData) => {
  const rows = interventionData.trim().split("\n").slice(1);

  const values = rows[0].match(/\S+/g);
  return {
    date: values[0],
    week: `(${values[1]})`,
    rate: values[2],
  };
};

// ESCRIBIR LA INFO EN UN ARCHIVO JSON
export const writeFileJson = async (data, number) => {
  const jsonFilePath = `./src/data/data${number}.json`;

  switch (number) {
    case 0:
      data = parseMoneyChange(data);
      break;
    case 1:
      data = parseBankTable(data);
      break;
    case 2:
      data = parseIntervention(data);
      break;

    default:
      break;
  }

  // return data
  fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error al escribir el archivo JSON:", err);
      return;
    }
    console.log(`Archivo JSON creado: ${jsonFilePath}`);
  });
};

// OBTENER LA INFORMACION DE LA DATA
export const getImgData = async (imgPath) => {
  const {
    data: { text },
  } = await worker.recognize(imgPath);
  return text;
};
