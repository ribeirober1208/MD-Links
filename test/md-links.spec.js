const {mdLinks} = require('../src/index.js');


describe('mdLinks', () => {

  it('Ler Conteudo', async () => {
    const links = await mdLinks(caminhoDoArquivo);
    expect(links).toBeInstanceOf(Array);
    expect(links[0]).toHaveProperty('href');
    expect(links[0]).toHaveProperty('text');

  
  });

});
