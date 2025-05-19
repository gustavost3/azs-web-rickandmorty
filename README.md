# azs-web-rickandmorty

Este é um projeto React que utiliza a API de Rick and Morty para exibir informações sobre personagens, episódios e locais do universo da série.

## Sobre o Projeto

O azs-web-rickandmorty é uma aplicação web desenvolvida com React que consome a API pública de Rick and Morty via GraphQL para apresentar dados da série de forma interativa e amigável.

## Estrutura do Projeto

A estrutura do projeto segue a seguinte organização:

```
rick-and-morty-app/
├── src/
│   ├── components/     # Componentes reutilizáveis
|   |    ├──CharacterCard.css
|   |    ├──CharacterCard.jss
|   |    ├──EpisodeCard.css
|   |    ├──EpisodeCard.jss
|   |    ├──Header.css
|   |    ├──Header.js
|   |    ├──SearchBar.css
|   |    ├──SearchBar.js
│   ├── contexts/       # Contextos React para estado global
|   |    ├──EpisodeContext.js
│   ├── pages/          # Componentes de página
|   |    ├──AllEpisodes.css
|   |    ├──AllEpisodes.js
|   |    ├──EpisodeDetail.css
|   |    ├──EpisodeDetail.js
|   |    ├──FavoriteEpisodes.css
|   |    ├──FavoriteEpisodes.js
│   ├── styles/         # Declaraçao de variaveis de estilo globais
|   |    ├──variables.css
│   ├── App.js          # Componente principal
│   ├── App.css         # Estilos globais
│   ├── apollo-client.js # Configuração do Apollo Client
│   └── index.js        # Ponto de entrada
```

## Demo

O projeto está disponível online em: [https://azship-gustavost.vercel.app/](https://azship-gustavost.vercel.app/)

## Tecnologias Utilizadas

- React
- JavaScript
- CSS
- GraphQL
- Apollo Client
- API Rick and Morty via GraphQL

## Instalação

Para instalar e executar este projeto localmente, siga os passos abaixo:

```bash
git clone https://github.com/seu-usuario/azs-web-rickandmorty.git
```

```bash
cd azs-web-rickandmorty
```

```bash
npm install
```

```bash
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Funcionalidades

- Visualização de personagens da série
- Informações sobre episódios
- Adiçao de episodios aos favoritos
- Marcação de episodios como assistidos
- Busca e filtragem de conteúdo

## Scripts Disponíveis

### `npm start`

Executa a aplicação em modo de desenvolvimento.
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

### `npm test`

Inicia o executor de testes no modo interativo.

### `npm run build`

Compila a aplicação para produção na pasta `build`.

## API

Este projeto utiliza a [Rick and Morty API](https://rickandmortyapi.com/graphql) para obter dados sobre a série.

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Contato

Link do Projeto: [https://github.com/seu-usuario/azs-web-rickandmorty](https://github.com/seu-usuario/azs-web-rickandmorty)
