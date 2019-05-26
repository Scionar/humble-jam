import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { MetaData } from '../components';
import { LayoutContainer, PostFeedContainer } from '../containers';

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 *
 */
const Index = ({ location }) => (
    <>
        <MetaData location={location} />
        <LayoutContainer isHome={true}>
            <PostFeedContainer />
        </LayoutContainer>
    </>
);

Index.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
    query GhostPostQuery($limit: Int!, $skip: Int!) {
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
