const fs = require("fs");
//tornar repositório instalável
//rever erros do test

function mdLinks(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    fs.readFile(caminhoDoArquivo, "utf8", (err, data) => {
      if (err) { 
        console.log(err);
        reject(new Error('Erro ao ler o arquivo'));
        return;
      }
      
      const links = data.match(/https?:\/\/[^\s/$.?#].[^\s]*/gi);
      const titles = data.match(/\[([^\]]+)\]/g);

      if (links) {
        const linksInfo = links.map((link, index) => ({
          text: titles[index].slice(1, -1),
          href: link,
          file: caminhoDoArquivo,
          broken: false
        }));
        resolve(linksInfo);
       
      } else {
        resolve([]);
      }
    });
  });
}

function validarLinks(links) {
  const resultados = [];

  function fazerRequisicao(link) {
    return new Promise((resolve, reject) => {
      const resultado = {
        href: link.href,
        text: link.text,
        file: link.file,
      };

      fetch(link.href)
        .then((response) => {
          resultado.status = response.status;
          resultado.ok = response.ok ? 'ok' : 'fail';
          resultado.broken = !response.ok;
          resolve(resultado);
        })
        .catch((error) => {
          resultado.status = null;
          resultado.ok = 'fail';
          resultado.broken = true;
          resolve(resultado);
        });
    });
  }

  const promessas = links.map(fazerRequisicao);

  return Promise.all(promessas);
}

function stats(links) {
    const totalLinks = links.length;
    const linksUnicos = [...new Set(links.map(link => link.href))].length;
    const brokenLinks = links.filter((link) => link.status && link.status !== 200).length;

    return { 
        total: totalLinks, 
        unique: linksUnicos, 
        broken: brokenLinks, 
    };
  }
  

module.exports = { mdLinks, validarLinks, stats };
