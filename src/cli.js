#!/usr/bin/env node
const fs = require('fs');
const { mdLinks, validarLinks, stats } = require('./index.js');
const caminhoDoArquivo = process.argv[2];
const opcaoValidate = process.argv.includes('--validate');
const opcaoStats = process.argv.includes('--stats');
const chalk = require('chalk');

//const axios = require("axios");

if (opcaoValidate) {
    mdLinks(caminhoDoArquivo)
        .then(links => validarLinks(links))
        .then(resultados => {
            if (resultados.length === 0) {
                console.log(chalk.bgRed.black('Nenhum link encontrado'));
                return;
            }
            resultados.forEach(resultado => {
                console.log(chalk.white(`Title: ${resultado.text}`));
                console.log(chalk.cyan(`URL: ${resultado.href}`));
                console.log(chalk.yellow(`File: ${resultado.file}`));
                console.log(chalk.bgGray.blue(`${resultado.ok ? 'Status: ok' : 'Status: fail'} ${resultado.status}`));
                console.log();
            });
        })
        .catch(error => {
            console.error(error);
        });

} else if (opcaoStats) {
    mdLinks(caminhoDoArquivo)
        .then(links => stats(links))
        .then(estatisticas => {
            console.log(chalk.bgCyan.black(`Total: ${estatisticas.total}`));
            console.log(chalk.bgCyan.black(`Únicos: ${estatisticas.unique}`));
            console.log(chalk.bgRed.black(`Broken: ${estatisticas.broken}`));
        })
        .catch(error => {
            console.error(error);
        });
} else {
    mdLinks(caminhoDoArquivo)
        .then(links => {
            if (links.length === 0) {
                console.log(chalk.bgRed.black('Nenhum link encontrado'));
                return;
            }
            links.forEach(link => {
                console.log(`Title: ${link.text}`);
                console.log(`URL: ${link.href}`);
                console.log(`File: ${link.file}`);
                console.log();
            });
        })
        .catch(error => {
            console.error(error);
        });
}
