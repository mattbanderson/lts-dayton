"use strict";

const fs = require('fs');

let inputFile = '';
let outputFile = 'output.json';

if (process.argv[2]) {
  inputFile = process.argv[2];
  if (process.argv[3]) {
    outputFile = process.argv[3];
  } 
} else {
  console.log('Please specify an input file.');
  process.exit();
}

fs.readFile(inputFile, (err, data) => {
  let json = JSON.parse(data);
  let features = json.features;
  features.forEach(feature => {
    delete feature.properties.description;
  });
  fs.writeFile(outputFile, JSON.stringify(json));
});
