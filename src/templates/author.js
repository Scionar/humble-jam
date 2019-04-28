import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { MetaData } from "../components/common/meta"
import { LayoutContainer, AuthorPostFeedContainer } from "../containers"

/**
 * Author page (/author/:slug)
 *
 * Loads all posts for the requested author.
 *
 */
const Author = ({ data, location }) => {
    const author = data.ghostAuthor

    return (
        <>
            <MetaData data={data} location={location} type="profile" />
            <LayoutContainer>
                <AuthorPostFeedContainer authorSlug={author.slug} />
            </LayoutContainer>
        </>
    )
}

Author.propTypes = {
    data: PropTypes.shape({
        ghostAuthor: PropTypes.shape({
            slug: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            profile_image: PropTypes.string,
            website: PropTypes.string,
            bio: PropTypes.string,
            location: PropTypes.string,
            facebook: PropTypes.string,
            twitter: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default Author

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
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
`
