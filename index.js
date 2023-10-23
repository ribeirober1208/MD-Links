const fs = require("fs");

function lerArquivo(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    fs.readFile(caminhoDoArquivo, "utf8", (err, data) => {
      if (err) { 
        console.log(err);
      reject();
      }
      resolve(data); 
    });
  });
}




module.exports = { lerArquivo };

