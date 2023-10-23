const {lerArquivo} = require('../'); //importando


describe('mdLinks', () => {

  it('Deveria Ler Conteudo', () => {
    const meDeve = lerArquivo("./test/files/oneFile.md"); //ação
    expect(meDeve).resolves.toEqual ("Olá mundo");
  
  });

});
