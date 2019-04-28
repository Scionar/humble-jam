import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { PostDate, PostHeroImage, PostContent, MetaData } from "../components"
import { LayoutContainer } from "../containers"

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
    const post = data.ghostPost

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <LayoutContainer>
                <PostDate date={post.published_at} />
                <h1>{post.title}</h1>
                <PostHeroImage url={post.feature_image} alt={post.title} />
                <PostContent html={post.html} />
            </LayoutContainer>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
