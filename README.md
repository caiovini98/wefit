# Wefit Movies
Olá, este é um projeto em resposta ao desafio técnico proposto pela WeFit, na qual consiste em buscar a partir de uma API (json-server) dados de filmes, e o usuário pode filtrar filmes, adicionar ao carrinho e por fim, finalizar a compra.

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[git](https://git-scm.com) e [node.js](https://nodejs.org/en/).
Também, vai precisar de um editor para trabalhar com o código, recomendo o [VS Code](https://code.visualstudio.com/).

### Rodando o projeto

```bash
# Clone este repositório (ou download )
$ git clone <link>

# Acesse a pasta do projeto no terminal/cmd
$ cd wefit-app

# Abra a pasta no editor de codigo (VS Code ou outro de sua preferência).

# Instale as dependências
$ yarn install (ou npm install)

# Após a instalação, execute o comando para rodar a aplicação
$ yarn start (ou npm start)

# O servidor inciará na porta:3000. Se não abrir automaticamente, acesse 
$ http://localhost:3000
```

Caso o comando npm start não funcionar, devido a um erro do "react-script", verifique se a dependência do react-script está disponível ou não no package.json
Caso não esteja, adicione manualmente no projeto por meio de:

```bash
$ yarn add react-scripts --save (ou npm install react-scripts --save)
```

Neste desafio, está sendo utilizado o Json-Server, uma biblioteca capaz de criar uma API Fake, e para rodar a API, rode o comando no terminal dentro da pasta do projeto:

```bash
$ yarn start-json-server
```

Pronto! A API estará rodando perfeitamente.
Caso dê algum erro de política, nao se preocupe, basta rodar o comando abaixo no terminal dentro da pasta do projeto - local onde você rodou o comando acima:

```bash
$  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### 🛠 Tecnologias utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- [React](https://pt-br.reactjs.org/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [HTML e CSS](https://www.w3schools.com/)
- [JSON Server](https://www.npmjs.com/package/json-server)
