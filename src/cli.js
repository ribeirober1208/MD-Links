#!/usr/bin/env node
const { mdLinks, validarLinks } = require('./index.js');
const caminhoDoArquivo = process.argv[2];
const opcaoValidate = process.argv.includes('--validate');
const opcaoStats = process.argv.includes('--stats');
const chalk = require('chalk');

mdLinks(caminhoDoArquivo, { validate: opcaoValidate, stats: opcaoStats })
    .then(links => {
        if (links) {
            if (opcaoValidate) {
                /*validarLinks(links)
                    .then(resultados => {
                        resultados.forEach(resultado => {
                            console.log(chalk.white(`Title: ${resultado.text}`));
                            console.log(chalk.cyan(`URL: ${resultado.href}`));
                            console.log(chalk.yellow(`File: ${resultado.file}`));
                            console.log(chalk.bgGreen.blue(`${resultado.ok ? 'Status: ok' : 'Status: fail'} ${resultado.status}`));
                            console.log();
                        });
                    })
                    .catch(console.error);*/
                    validarLinks(links)
                    
            } else if (opcaoStats) {
                const totalLinks = links.length;
                const linksUnicos = [...new Set(links.map(link => link.href))].length;
                const brokenLinks = links.filter((link) => link.status !== 200).length;
                console.log(chalk.bgYellow.black(`Total: ${totalLinks}`));
                console.log(chalk.bgYellow.black(`Únicos: ${linksUnicos}`));
                console.log(chalk.bgYellow.black(`Broken: ${brokenLinks}`));   

            } else {
                links.forEach(link => {
                    console.log(`Title: ${link.text}`);
                    console.log(`URL: ${link.href}`);
                    console.log(`File: ${link.file}`);
                    console.log();
                });
            }
        } else {
            links.forEach(link => {
                console.log(`Nenhum link encontrado no arquivo. ${brokenLinks}`);
        })};
    })
    .catch(console.error);

//broken não está lendo links com erro
//não está lendo erro dos links inválido
//title não aparece
