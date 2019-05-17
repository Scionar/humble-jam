require(`dotenv`).config({
    path: `.env.${process.env.NODE_ENV}`
});
const path = require(`path`);

const config = require(`./src/utils/siteConfig`);
const generateRSSFeed = require(`./src/utils/rss/generate-feed`);

let ghostConfig = {
    apiUrl: process.env.GHOST_API_URL,
    contentApiKey: process.env.GHOST_CONTENT_API_KEY
};

/**
 * Validate Ghost API configuration.
 */
const { apiUrl, contentApiKey } = ghostConfig;
if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
    /* eslint-disable */
    throw new Error(
        `GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`
    );
    /* eslint-enable */
}

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */

const pluginConfig = [
    {
        resolve: `gatsby-plugin-sass`
    },
    {
        resolve: `gatsby-plugin-react-svg`
    },
    /**
     *  Content Plugins
     */
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: path.join(__dirname, `src`, `pages`),
            name: `pages`
        }
    },
    // Setup for optimised images.
    // See https://www.gatsbyjs.org/packages/gatsby-image/
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: path.join(__dirname, `src`, `images`),
            name: `images`
        }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
        resolve: `gatsby-source-ghost`,
        options: ghostConfig
    },
    /**
     *  Utility Plugins
     */
    {
        resolve: `gatsby-plugin-ghost-manifest`,
        options: {
            short_name: config.shortTitle,
            start_url: `/`,
            background_color: config.backgroundColor,
            theme_color: config.themeColor,
            display: `minimal-ui`,
            icon: `static/${config.siteIcon}`,
            query: `
            {
                allGhostSettings {
                    edges {
                        node {
                            title
                            description
                        }
                    }
                }
            }
          `
        }
    },
    {
        resolve: `gatsby-plugin-feed`,
        options: {
            query: `
            {
                allGhostSettings {
                    edges {
                        node {
                            title
                            description
                        }
                    }
                }
            }
          `,
            feeds: [generateRSSFeed(config)]
        }
    },
    {
        resolve: `gatsby-plugin-advanced-sitemap`,
        options: {
            query: `
            {
                allGhostPost {
                    edges {
                        node {
                            id
                            slug
                            updated_at
                            created_at
                            feature_image
                        }
                    }
                }
                allGhostPage {
                    edges {
                        node {
                            id
                            slug
                            updated_at
                            created_at
                            feature_image
                        }
                    }
                }
                allGhostTag {
                    edges {
                        node {
                            id
                            slug
                            feature_image
                        }
                    }
                }
                allGhostAuthor {
                    edges {
                        node {
                            id
                            slug
                            profile_image
                        }
                    }
                }
            }`,
            mapping: {
                allGhostPost: {
                    sitemap: `posts`
                },
                allGhostTag: {
                    sitemap: `tags`
                },
                allGhostAuthor: {
                    sitemap: `authors`
                },
                allGhostPage: {
                    sitemap: `pages`
                }
            },
            exclude: [
                `/dev-404-page`,
                `/404`,
                `/404.html`,
                `/offline-plugin-app-shell-fallback`
            ],
            createLinkInHead: true
        }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-force-trailing-slashes`,
    `gatsby-plugin-offline`
];

/**
 * If Google Analytics tracking ID has been defined,
 * use gatsby plugin for it.
 */
const googleAnalyticsId = process.env.GATSBY_GOOGLE_ANALYTICS_ID;
if (googleAnalyticsId) {
    pluginConfig.push({
        resolve: `gatsby-plugin-google-analytics`,
        options: {
            trackingId: googleAnalyticsId
        }
    });
}

module.exports = {
    siteMetadata: {
        siteUrl: process.env.GATSBY_SITE_URL
    },
    plugins: pluginConfig
};
