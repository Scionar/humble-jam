import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { Footer } from "../components"

const FooterContainer = ({ data }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter
        ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        : null
    const facebookUrl = site.facebook
        ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
        : null
    const rssUrl = `https://feedly.com/i/subscription/feed/${site.url}/rss/`
    const currentYear = new Date().getFullYear()

    return (
        <Footer
            siteTitle={site.title}
            facebookUrl={facebookUrl}
            twitterUrl={twitterUrl}
            siteUrl={rssUrl}
            year={currentYear}
        />
    )
}

FooterContainer.propTypes = {
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const FooterSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query Footer {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={data => <FooterContainer data={data} {...props} />}
    />
)

export default FooterSettingsQuery
