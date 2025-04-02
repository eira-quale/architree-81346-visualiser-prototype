// src/services/excel-parser/run-parser.js
import fs from 'fs';
import path from 'path';
import { parseExcelToRealObjects } from './parser.js';

const filePath = path.resolve('./raw-data/raw-data-with-location.xlsx'); // or wherever you drop the Excel file
const buffer = fs.readFileSync(filePath);

const { realObjects, trees } = parseExcelToRealObjects(buffer);

fs.writeFileSync('./parsed-data/realObjects.json', JSON.stringify(realObjects, null, 2));
fs.writeFileSync('./parsed-data/trees.json', JSON.stringify(trees, null, 2));

console.log('✅ Parsed Excel and saved JSON files.');