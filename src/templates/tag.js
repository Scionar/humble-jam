import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { MetaData } from '../components/common/meta'
import { LayoutContainer, TagPostFeedContainer } from '../containers'

/**
* Tag page (/tag/:slug)
*
* Loads all posts for the requested tag.
*
*/
const Tag = ({ data, location }) => {
    const tag = data.ghostTag

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <LayoutContainer>
                <TagPostFeedContainer tagSlug={tag.slug} />
            </LayoutContainer>
        </>
    )
}

Tag.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Tag

export const pageQuery = graphql`
    query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {tags: {elemMatch: {slug: {eq: $slug}}}},
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
