const fs = require("fs");

function mdLinks(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    fs.readFile(caminhoDoArquivo, "utf8", (err, data) => {
      if (err) { 
        console.log(err);
        reject();
      }
      const links = data.match(/https?:\/\/[^\s/$.?#].[^\s]*/gi);
      if (links) {
        
        resolve(links.map((link) => ({ href: link, text: '', file: caminhoDoArquivo })));//
       
      } else {
        resolve([]);
      }
    });
  });
}

async function validarLinks(links) {
  const resultados = [];

  for (const link of links) {
    const resultado = {
      href: link.href,
      text: link.text,
      file: link.file,
    };

    try {
      const response = await fetch(link.href);

      if (response.ok) {
        resultado.status = response.status;
        resultado.ok = 'ok';
      } else {
        resultado.status = response.status;
        resultado.ok = 'fail';
      }
    } catch (error) {
      resultado.status = null;
      resultado.ok = 'fail';
    }

    resultados.push(resultado);
  }

  return resultados;
}

function stats(links) {
    const totalLinks = links.length;
    const linksUnicos = [...new Set(links.map(link => link.href))].length;
    const brokenLinks = links.filter((link) => link.status !== 200).length;
  
    return { 
        total: totalLinks, 
        unique: linksUnicos, 
        broken: brokenLinks, 
    };
  }
  

module.exports = { mdLinks, validarLinks, stats };
