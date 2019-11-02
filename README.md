# Aplicação em Node.js para consumo de API's do Google Maps 
Este repositório contém uma aplicação desenvolvida em Node.js que consome alguns serviços do Google. Tem a finalidade de salvar os dados da localização atual (aproximada) de um usuário e mostrar na tela uma imagem da localização obtida.
O salvamento é feito em um banco de dados (postgres).

Preview
![alt text](https://github.com/Douglas-de-Freitas/node-crud-restify/blob/master/img/sistema.PNG?raw=true)

Os seguintes módulos e ferramentas foram utilizados para o desenvolvimento da aplicação:

Cliente de acesso ao servidor: https://www.getpostman.com/

Módulo para manter o servidor funcionando: https://github.com/remy/nodemon

Framework para rotas REST: https://github.com/restify/node-restify

Módulo ORM para Pg, Mysql ou qualquer outro: https://github.com/tgriesser/knex, http://knexjs.org

Api's utilizadas neste projeto:
![alt text](https://github.com/Douglas-de-Freitas/node-crud-restify/blob/master/img/apis.PNG?raw=true)

## Instalação e execução

Para testar este contexto, você deve ter o Postgres instalado, com a estrutura de banco de dados e tabela já criados. Você pode executar o script a seguir para gerar esta estrutura!

```sql
create table if not exists places(
	id serial primary key not null,
	place_id text,
	address text,
	image text
);
```

No arquivo index.js, troque os valores de configuração do Postgres por aqueles utilizados por você.

```javascript
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'seu_host',
    user : 'seu_usuario',
    password : 'sua_senha',
    database : 'seu_banco'
    }
});
```

Acesse o terminal e execute o comando `npm i -g nodemon` para instalar o nodemon como global.

Em seguida, dentro da pasta do projeto, execute

```
npm install
```

Após concluída a instalação, coloque no arquivo index.js a sua chave api, execute o comando `nodemon index.js` e teste a aplicação.

Referência: https://www.udemy.com/course/aplicacoes-web-na-pratica-javascript-nodejs/