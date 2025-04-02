import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';

export function parseExcelToRealObjects(buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  const aspectColumns = {
    "Verksamhetsfunktion (==)": "Verksamhetsfunktion",
    "Verksamhets-produkt (-)": "Verksamhetsprodukt",
    "Infrastrukturfunktion (=)": "Infrastrukturfunktion",
    "Infrastruktur-produkt (--)": "Infrastrukturprodukt"
  };

  const locationColumn = "Lokalisering (++)";

  const trees = {};
  const nodeMaps = {};

  for (const name of Object.values(aspectColumns)) {
    trees[name] = { name, nodes: [] };
    nodeMaps[name] = {};
  }

  // Add location tree
  trees["Lokalisering"] = { name: "Lokalisering", nodes: [] };
  nodeMaps["Lokalisering"] = {};

  const realObjects = [];

  const insertNode = (treeName, rds, name, previousName, realObjectId) => {
    const cleaned = rds.replace(/^[=+\-]+/, '').replace(/\.$/, ''); // remove trailing period for 'has location'
    const parts = cleaned.split('.');
    let currentPath = '';
    let parent = null;
    const map = nodeMaps[treeName];
    const root = trees[treeName].nodes;

    for (let i = 0; i < parts.length; i++) {
      currentPath = i === 0 ? parts[i] : `${currentPath}.${parts[i]}`;
      if (!map[currentPath]) {
        const node = {
          id: uuidv4(),
          name: i === parts.length - 1 ? name : parts[i],
          previousName: i === parts.length - 1 ? previousName : "",
          rds: `${rds.startsWith('+') ? '++' : rds.match(/^[-=]+/)?.[0] || ''}${currentPath}`,
          realObjectId: i === parts.length - 1 ? realObjectId : null,
          children: [],
        };

        // If it's the location tree, initialize locatedHere
        if (treeName === "Lokalisering") {
          node.locatedHere = [];
        }

        map[currentPath] = node;
        (parent ? parent.children : root).push(node);
      }
      parent = map[currentPath];
    }

    return {
      id: parent.id,
      rds: parent.rds,
      name: parent.name,
      previousName: parent.previousName,
      realObjectId
    };
  };

  for (const row of data) {
    const name = row["Benämning"];
    const prevName = row["Gammal benämning"] || "";
    const id = uuidv4();

    const realObject = {
      id,
      name,
      previousName: prevName,
      aspects: {}
    };

    // Parse regular aspects
    for (const [colName, treeName] of Object.entries(aspectColumns)) {
      const rds = row[colName];
      if (typeof rds === 'string' && /^[=+\-]/.test(rds)) {
        const aspect = insertNode(treeName, rds, name, prevName, id);
        realObject.aspects[treeName] = aspect;
      }
    }

    // Parse location logic
const locRds = row[locationColumn];
if (typeof locRds === 'string' && locRds.startsWith('++')) {
  const cleaned = locRds.replace(/^\++/, '').replace(/\.$/, '');

  if (locRds.endsWith('.')) {
    // Object is located at this location
    const locNode = nodeMaps["Lokalisering"][cleaned];
    if (locNode) {
      locNode.locatedHere.push(id);
      realObject.location = `++${cleaned}`;
    } else {
      console.warn(`⚠️ Location node missing for ${locRds} (ref only).`);
    }
  } else {
    // Object *is* this location → create node and assign aspect
    const aspect = insertNode("Lokalisering", locRds, name, prevName, id);
    realObject.aspects["Lokalisering"] = aspect;
  }
}

    realObjects.push(realObject);
  }

  return {
    realObjects,
    trees: Object.values(trees)
  };
}
