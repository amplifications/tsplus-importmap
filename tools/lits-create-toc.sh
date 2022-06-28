#!/usr/bin/env ts-node

const fs = require('fs');
const path = require('path');
const util = require('util');

const ignoreList = [
  '_code',
  '_docs',
  '.eslintrc.json',
  '.vscode',
  'node_modules',
  'logs',
  'out',
  'package-lock.json',
  'test.coverage',
  
  // FIX include these
  // 'jest.config.ts',
  // 'lits-create-toc.sh',
  // 'lits-user-theme.less',
  // 'TODO',
  // 'global.d.ts',
  "_.res.resources"
];

const getToC = (dirPath, ignoreDirs = []) => {
  const lsResult = fs
    .readdirSync(dirPath)
    .filter((item) => ignoreDirs.indexOf(item) == -1).sort(Intl.Collator().compare);

  const retVal = [];
  lsResult.forEach((itemName) => {
    if (fs.statSync(dirPath + '/' + itemName).isDirectory()) {
      retVal.push({
        page: itemName,
        subs: getToC(dirPath + '/' + itemName, ignoreDirs),
      });
    } else {
      retVal.push({
        page: itemName,
        file:
          dirPath.substring(2) +
          '/' +
          itemName.substring(0, itemName.lastIndexOf('.')) +
          '.html',
      });
    }
  });
  return retVal;
};

const result = getToC('.', ignoreList);
fs.writeFileSync('out-saved/lits-toc.generated.json', JSON.stringify(Object.values(result)));
console.log("Autog-generated lits-toc.generated.json");
