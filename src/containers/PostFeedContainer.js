import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import moment from "moment"

import { PostCard } from "../components"

const PostFeedContainer = ({ data }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            {posts.map(({ node }) => {
                const postUrl = `/${node.slug}/`
                const postDate = moment(node.published_at).format(
                    `MMMM DD, YYYY`
                )
                const postTitle = node.title
                const postImage = node.feature_image

                return (
                    <PostCard
                        key={node.id}
                        postUrl={postUrl}
                        date={postDate}
                        title={postTitle}
                        featuredImage={postImage}
                    />
                )
            })}
        </>
    )
}

PostFeedContainer.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const PostFeedContainerQuery = props => (
    <StaticQuery
        query={graphql`
            query PostFeedContainer {
                allGhostPost(sort: { order: DESC, fields: [published_at] }) {
                    edges {
                        node {
                            ...GhostPostFields
                        }
                    }
                }
            }
        `}
        render={data => <PostFeedContainer data={data} {...props} />}
    />
)

export default PostFeedContainerQuery
