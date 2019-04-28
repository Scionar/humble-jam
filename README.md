# Humbe JAM :pray: :zap:

JAM stack implementation of [Humble Ghost theme](https://github.com/Scionar/Humble).

This project is based on [Gastby Starter Ghost](https://github.com/tryghost/gatsby-starter-ghost). Thanks for their amazing work. Specially with meta data components.

**NOTE: This project is still on work.**

## Installing

Install dependecies.

```
yarn
```

## Setup content fetch

Create file names .ghost.json into repository root. Get API URL and API key from your Ghost installation's integrations tab.

```json
{
  "development": {
    "apiUrl": "<API URL>",
    "contentApiKey": "<API CONTENT KEY>"
  },
  "production": {
    "apiUrl": "<API URL>",
    "contentApiKey": "<API CONTENT KEY>"
  }
}
```

## Modify site config

File `/src/utils/siteConfig.js` includes theme settings which are not coming from Ghost instance. Also a good place for meta fallback values.

## Running development server

Start development server.

```
gatsby develop
```
