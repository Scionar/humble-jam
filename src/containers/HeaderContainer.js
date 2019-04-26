import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { Header } from "../components"
import { NavigationContainer } from "."

const HeaderContainer = ({ data, isHome }) => {
    const site = data.allGhostSettings.edges[0].node

    return (
        <Header
            title={site.title}
            logoUrl={site.logo}
            description={site.description}
            navigation={<NavigationContainer />}
            isHome={isHome}
        />
    )
}

HeaderContainer.defaultProps = {
    isHome: false,
}

HeaderContainer.propTypes = {
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const HeaderContainerQuery = props => (
    <StaticQuery
        query={graphql`
            query HeaderContainer {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={data => <HeaderContainer data={data} {...props} />}
    />
)

export default HeaderContainerQuery
