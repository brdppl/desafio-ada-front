# Desafio Técnico - Frontend

### Disclaimer

Os pacotes **ace-builds**, **bootstrap** e **font-awesome** só foram instalados pois são necessários para o funcionamento do pacote **ngx-markdown-editor**, o restante do projeto não utiliza nenhum recurso desses pacotes.

### Instalação com Docker

Certifique-se que você tem o [Docker](https://www.docker.com/get-started/) instalado na sua máquina.

Para rodar o projeto basta clonar o repositório e executar os seguintes comandos no terminal:

```console
> cd desafio-ada-front
> docker-compose up -d
```

Acesse através da URL `http://localhost:4200` no seu navagador.

### Instalação sem Docker

Este projeto foi desenvolvido utilzando o [Angular CLI](https://angular.io/cli) 16.1.1

Caso não tenha instalado em sua máquina, execute o comando `npm install -g @angular/cli` no seu terminal.

Para rodar o projeto basta clonar o repositório e executar os seguintes comandos no terminal:

```console
> cd desafio-ada-front/BACK
> npm install
> npm run server
```

Ela responderá na porta 5000.

Em seguida, abra uma segunda instância no seu terminal e execute os seguintes comandos:

```console
> cd desafio-ada-front/FRONT
> yarn install
> yarn start
```

Acesse através da URL `http://localhost:4200` no seu navagador.

Para funcionar, o backend deve estar rodando na porta 5000.

Na tela de login acesse com as credenciais:
login: `letscode`
senha: `lets@123`

### Testes unitários

Para rodar os testes unitários do frontend, basta abrir o terminal e executar os seguintes comandos:

```console
> cd desafio-ada-front/FRONT
> yarn test
```

Ou

```console
> cd desafio-ada-front/FRONT
> yarn test:coverage
```

### Lint

Para rodar o lint no frontend, basta abrir o terminal e executar os seguintes comandos:

```console
> cd desafio-ada-front/FRONT
> yarn lint
```