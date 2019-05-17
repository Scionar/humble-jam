# Humbe JAM :pray: :zap:

JAM stack implementation of [Humble Ghost theme](https://github.com/Scionar/Humble).

This project is based on [Gastby Starter Ghost](https://github.com/tryghost/gatsby-starter-ghost). Thanks for their amazing work. Specially with meta data components.

**NOTE: This project is still on work.**

## Installing

Install dependecies.

```
yarn
```

## Setup site configuration

Create `.env.*` file depending on your used environment. `.env.development` for development and `.env.production` for production. Example configuration:

```
# Ghost API
GHOST_API_URL=
GHOST_CONTENT_API_KEY=

# Site domain. Do not include a trailing slash!
GATSBY_SITE_URL=

# This allows an alternative site title for meta data for pages.
GATSBY_SITE_TITLE_META=

# This allows an alternative site description for meta data for pages.
GATSBY_SITE_DESCRIPTION_META=

# Used for App manifest e.g. Mobile Home Screen
GATSBY_MANIFEST_SHORT_TITLE=

# Disqus
GATSBY_DISQUS_SHORTNAME=

# Google Analytics
GATSBY_GOOGLE_ANALYTICS_ID=
```

## Personalization

Favicons are found under `/static/`.

## Running development server

Start development server.

```
gatsby develop
```
