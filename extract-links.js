module.exports = () => {
    // ...
  };
const { log } = require('console');
  const fs = require('fs');
  const extractor = require('markdown-link-extractor');
  
  // Leitura do arquivo Markdown
  fs.readFile('README.md', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }
  
    // Extrai os links
    const links = extractor(data);
    console.log (links);
    // Imprime os links no console
    console.log('Links encontrados:');
    links.forEach(link => console.log(link));
  });
  