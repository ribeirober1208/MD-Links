const { expect } = require('chai');
const { mdLinks, validarLinks, stats } = require('../src/index.js');

describe('mdLinks', () => {
  it('Ler Conteudo com links', () => {
    return mdLinks('./files/links.md').then(links => {
      expect(links).to.be.an('array');
      expect(links).to.have.lengthOf.at.least(1);
      expect(links[0]).to.have.property('href');
      expect(links[0]).to.have.property('text');
      expect(links[0]).to.have.property('file');
    });
  });

  it('Ler Conteudo sem links', () => {
    return mdLinks('./files/empty.md').then(links => {
      expect(links).to.be.an('array').that.is.empty;
    });
  });

  it('Ler Conteudo com erro', () => {
    return mdLinks('./files/links.md').catch(error => {
      expect(error).to.be.an('error');
    });
  });
});

describe('validarLinks', () => {
  it('Deve retornar os resultados de validação dos links', () => {
    const links = [
      { href: 'https://www.google.com', text: 'Google', file: './files/links.md' },
      { href: 'https://www.laboratoria.la/br', text: 'Laboratória', file: './files/links.md' },
      { href: 'https://developer.mozilla.org/pt-BR', text: 'MND', file: './files/links.md' }
    ];

    return validarLinks(links).then(resultados => {

      expect(resultados).to.be.an('array');
      expect(resultados).to.have.lengthOf(3);

      const primeiroResultado = resultados[0];
      expect(primeiroResultado).to.have.property('href', 'https://www.google.com');
      expect(primeiroResultado).to.have.property('text', 'Google');
      expect(primeiroResultado).to.have.property('file', './files/links.md');
      expect(primeiroResultado).to.have.property('status').that.is.a('number');
      expect(primeiroResultado).to.have.property('ok').that.is.oneOf(['ok', 'fail']);
      expect(primeiroResultado).to.have.property('broken').that.is.a('boolean');
    });
  });
});

describe('stats', () => {
  it('Deve retornar as estatísticas corretas para uma lista de links', () => {
    const links = [
    
      { href: 'https://www.google.com', status: 200 },
      { href: 'https://www.laboratoria.la/br', status: 200 },
      { href: 'https://developer.mozilla.org/pt-BR', status: 200 },
      { href: 'https://netflyx.com', stats: 404 },
      { href: 'https://gYthub.com', stats: 404 },
     
    ];
   
      const result = stats(links);

    expect(result).to.deep.equal({ total: 5, unique: 5, broken: 0 });

  });
});


