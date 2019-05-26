import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import { get } from 'lodash';

import { PostCard } from '../components';

const PostFeedContainer = ({ data }) => {
    const posts = data.allGhostPost.edges;

    return (
        <>
            {posts.map(({ node }) => {
                const postUrl = `/${node.slug}/`;
                const postDate = moment(node.published_at).format(
                    `MMMM DD, YYYY`
                );
                const postTitle = node.title;
                const postImage = get(
                    node,
                    `localFeatureImage.childImageSharp.fluid.src`,
                    null
                );

                return (
                    <PostCard
                        key={node.id}
                        postUrl={postUrl}
                        date={postDate}
                        title={postTitle}
                        featuredImage={postImage}
                    />
                );
            })}
        </>
    );
};

PostFeedContainer.propTypes = {
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.object.isRequired
};

const PostFeedContainerQuery = props => (
    <StaticQuery
        query={graphql`
            query PostFeedContainer {
                allGhostPost(sort: { order: DESC, fields: [published_at] }) {
                    edges {
                        node {
                            ...GhostPostFields
                            localFeatureImage {
                                childImageSharp {
                                    fluid(
                                        maxWidth: 750
                                        maxHeight: 70
                                        cropFocus: CENTER
                                    ) {
                                        src
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => <PostFeedContainer data={data} {...props} />}
    />
);

export default PostFeedContainerQuery;
