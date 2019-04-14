import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import { Layout } from "../components"
import { HeaderContainer, FooterContainer } from "."

const LayoutContainer = ({ data, children, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    return (
        <>
            <Helmet>
                <html lang={site.lang} />
            </Helmet>
            <Layout
                header={<HeaderContainer isHome={isHome} />}
                footer={<FooterContainer />}
            >
                {children}
            </Layout>
        </>
    )
}

LayoutContainer.defaultProps = {
    isHome: false,
}

LayoutContainer.propTypes = {
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
    isHome: PropTypes.bool,
}

const LayoutContainerQuery = props => (
    <StaticQuery
        query={graphql`
            query LayoutContainer {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={data => <LayoutContainer data={data} {...props} />}
    />
)

export default LayoutContainerQuery
