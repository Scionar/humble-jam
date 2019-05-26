import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { get } from 'lodash';

import {
    PostDate,
    PostHeroImage,
    PostContent,
    MetaData,
    DisqusBlock
} from '../components';
import { LayoutContainer } from '../containers';

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
    const post = data.ghostPost;

    const postImage = get(
        post,
        `localFeatureImage.childImageSharp.fluid`,
        null
    );

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <LayoutContainer>
                <PostDate date={post.published_at} />
                <h1>{post.title}</h1>
                {postImage && (
                    <PostHeroImage image={postImage} alt={post.title} />
                )}
                <PostContent html={post.html} />
                <DisqusBlock />
            </LayoutContainer>
        </>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            localFeatureImage: PropTypes.object
        }).isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
            localFeatureImage {
                childImageSharp {
                    fluid(maxWidth: 750, maxHeight: 400, cropFocus: CENTER) {
                        aspectRatio
                        src
                        srcSet
                        sizes
                    }
                }
            }
        }
    }
`;
