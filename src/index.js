const { error } = require("console");
const fs = require("fs");

function mdLinks(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    fs.readFile(caminhoDoArquivo, "utf8", (err, data) => {
      if (err) { 
        console.log(err);
        reject();
      }
      
      const links = data.match(/https?:\/\/[^\s/$.?#].[^\s]*/gi); //regex links md markdow
      if (links) {
        
        //resolve(links.map((link) => ({ text: '', href: link,  file: caminhoDoArquivo })));
        resolve(links.map((link) => ({ text: '', href: link,  file: caminhoDoArquivo, broken: false })));
       
      } else {
        resolve([]);
      }
    });
  });
}

function enviarRequisicao(link) {
  try {
   return fetch (link).then(
    resultado => {
      console.log(resultado.status);
      return { 
        status: resultado.status,
        ok : 'ok'
      }
    }
  ).catch( 
    error => {
      console.error(error);
      return {
        status : error,
        ok: 'fail',
      };

    
    }
  )  
  } catch (error) {

    return error
  }
}
function validarLinks(links) {
 
  const resultados = [];

  for (const link of links) {
    let resultado = {
      href: link.href,
      text: link.text,
      file: link.file,
    };
  enviarRequisicao (link.href);

   /* try {
      const response = await fetch(link.href);
      console.log(response.status);
      if (response.status === 200) {
        resultado.status = response.status;
        resultado.ok = 'ok';
      } else {
        resultado.status = 400;
        resultado.ok = 'fail';
        resultado.broken = true;
      }

    } catch (error) {
      console.log(error);
      resultado.status = error.status;
      resultado.ok = 'fail';
      resultado.broken = true;
    }*/

    resultados.push(resultado);
  }

  return resultados;
}

function stats(links) {
    const totalLinks = links.length;
    const linksUnicos = [...new Set(links.map(link => link.href))].length;
    const brokenLinks = links.filter((link) => link.broken).length; 

    return { 
        total: totalLinks, 
        unique: linksUnicos, 
        broken: brokenLinks, 
    };
  }
  

module.exports = { mdLinks, validarLinks, stats };
