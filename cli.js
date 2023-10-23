#!/usr/bin/env node
//doc para comandos de manipulação
module.exports = () => {
    // ...
  };
const { log } = require('console');
const extractor = require('markdown-link-extractor');
const { constants } = require('buffer');
const { lerArquivo } = require('./index.js');
const chalk = require('chalk')

const caminhoDoArquivo = process.argv[2];
lerArquivo(caminhoDoArquivo)
.then((conteudoArquivo) => {
    console.log(chalk.bgGrey(conteudoArquivo))
});
const inputs = process.argv
console.log(inputs);

const fs = require('fs');

// Lê o conteúdo do arquivo
fs.readFile('README.md', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  // Use uma expressão regular para encontrar links
  let regex = /(https?:\/\/[^\s]+)/g;
  let linksEncontrados = data.match(regex);

  // Imprime os links encontrados
  console.log('Links encontrados:');
  linksEncontrados.forEach(link => {
    console.log(link);
  });
});


