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
    const twitterUrl = author.twitter
        ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}`
        : null
    const facebookUrl = author.facebook
        ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}`
        : null

    return (
        <>
            <MetaData data={data} location={location} type="profile" />
            <LayoutContainer>
                <header className="author-header">
                    <div className="author-header-content">
                        <h1>{author.name}</h1>
                        {author.bio && <p>{author.bio}</p>}
                        <div className="author-header-meta">
                            {author.website && (
                                <a
                                    className="author-header-item"
                                    href={author.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Website
                                </a>
                            )}
                            {twitterUrl && (
                                <a
                                    className="author-header-item"
                                    href={twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Twitter
                                </a>
                            )}
                            {facebookUrl && (
                                <a
                                    className="author-header-item"
                                    href={facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Facebook
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="author-header-image">
                        {author.profile_image && (
                            <img src={author.profile_image} alt={author.name} />
                        )}
                    </div>
                </header>
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
