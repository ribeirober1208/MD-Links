const { mdLinks, validarLinks } = require('./index.js');
const caminhoDoArquivo = process.argv[2];
const opcaoValidate = process.argv.includes('--validate');
const opcaoStats = process.argv.includes('--stats');

mdLinks(caminhoDoArquivo, { validate: opcaoValidate, stats: opcaoStats })
    .then(links => {
        if (links) {
            if (opcaoValidate) {
                validarLinks(links)
                    .then(resultados => {
                        resultados.forEach(resultado => {
                            console.log(`${resultado.file} ${resultado.href} ${resultado.ok ? 'ok' : 'fail'} ${resultado.status}`);
                        });
                    })
                    .catch(console.error);
            } else if (opcaoStats) {
                const totalLinks = links.length;
                const linksUnicos = [...new Set(links.map(link => link.href))].length;
                console.log(`Total: ${totalLinks}\nÚnicos: ${linksUnicos}`);
            } else {
                links.forEach(link => {
                    //console.log(`${link.file} ${link.href} ${link.text}`);
                    console.log(chalk.white('Title: ') +  chalk.yellow(link.text));
                    console.log(chalk.white('URL: ') + chalk.blue(link.url));
                    console.log(chalk.white('File: ') + chalk.bgBlack(link.file));
                });
            }
        } else {
            console.log('Nenhum link encontrado no arquivo.');
        }
    })
    .catch(console.error);
