# Humbe JAM

JAM stack implementation of [Humble Ghost theme](https://github.com/Scionar/Humble).

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

## Running development server

Start development server.

```
gatsby develop
```
