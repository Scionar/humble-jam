import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import { Navigation } from '../components';

const NavigationContainer = ({ data }) => {
    const site = data.allGhostSettings.edges[0].node;

    return <Navigation data={site.navigation} />;
};

NavigationContainer.propTypes = {
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired
    }).isRequired
};

const NavigationContainerQuery = props => (
    <StaticQuery
        query={graphql`
            query NavigationContainer {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={data => <NavigationContainer data={data} {...props} />}
    />
);

export default NavigationContainerQuery;
