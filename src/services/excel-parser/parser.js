import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { Aspect } from '@/services/models/aspect.js';
import { TreeNode } from '@/services/models/treeNode.js';
import { TreeRoot } from '@/services/models/treeRoot.js';

export function parseExcelToRealObjects(buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  const aspectColumns = {
    "Verksamhetsfunktion (==)": "Verksamhetsfunktion",
    "Verksamhets-produkt (-)": "Verksamhetsprodukt",
    "Infrastrukturfunktion (=)": "Infrastrukturfunktion",
    
  };

  const locationColumn = "Lokalisering (++)";
  const trees = {};
  const nodeMaps = {};

  for (const name of Object.values(aspectColumns)) {
    trees[name] = new TreeRoot(uuidv4(), name);
    nodeMaps[name] = {};
  }

  trees["Lokalisering"] = new TreeRoot(uuidv4(), "Lokalisering");
  nodeMaps["Lokalisering"] = {};

  const realObjects = [];

  const insertNode = (treeName, rds, name, previousName, realObjectId) => {
    const cleaned = rds.replace(/^[=+\-]+/, '').replace(/\.$/, '');
    const parts = cleaned.split('.');
    let currentPath = '';
    let parent = null;
    const map = nodeMaps[treeName];
    const root = trees[treeName];

    for (let i = 0; i < parts.length; i++) {
      currentPath = i === 0 ? parts[i] : `${currentPath}.${parts[i]}`;
      if (!map[currentPath]) {
        const nodeId = uuidv4();
        const prefix = treeName === 'Lokalisering' ? '++' : rds.match(/^[-=]+/)?.[0] || '';

        const aspect = new Aspect({
          id: nodeId,
          rds: `${prefix}${currentPath}`,
          name: i === parts.length - 1 ? name : parts[i],
          previousName: i === parts.length - 1 ? previousName : '',
          aspectType: treeName,
          realObjectId: i === parts.length - 1 ? realObjectId : null,
        });

        const node = new TreeNode(aspect, nodeId);
        map[currentPath] = node;
        if (parent) {
          parent.children.push(node);
        } else {
          root.nodes.push(node);
        }
      }
      parent = map[currentPath];
    }

    return map[currentPath].data;
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

    for (const [colName, treeName] of Object.entries(aspectColumns)) {
      const rds = row[colName];
      if (typeof rds === 'string' && /^[=+\-]/.test(rds)) {
        const aspect = insertNode(treeName, rds, name, prevName, id);
        realObject.aspects[treeName] = aspect;
      }
    }

    const locRds = row[locationColumn];
    if (typeof locRds === 'string' && locRds.startsWith('++')) {
      const cleaned = locRds.replace(/^\++/, '').replace(/\.$/, '');

      if (locRds.endsWith('.')) {
        const locNode = nodeMaps["Lokalisering"][cleaned];
        if (locNode) {
          locNode.locatedHere.push(id);
          realObject.location = `++${cleaned}`;
        }
      } else {
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

export function getParsedTreesFromBuffer(buffer) {
  const { trees } = parseExcelToRealObjects(buffer);
  return trees;
}
