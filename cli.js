#!/usr/bin/env node

//doc para comandos de manipulação

const { soma, lerArquivo } = require('./index.js');
const chalk = require('chalk')
const resultado = soma(1, 3);
console.log(chalk.bgRed("A soma é: "), chalk.blue(resultado));

const caminhoDoArquivo = process.argv[2];
lerArquivo(caminhoDoArquivo)
.then((conteudoArquivo) => {
    console.log(chalk.bgGrey(conteudoArquivo))
});
const inputs = process.argv
console.log(inputs);

