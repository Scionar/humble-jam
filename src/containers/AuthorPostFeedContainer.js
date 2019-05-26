import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import { get } from 'lodash';

import { PostCard } from '../components';

const AuthorPostFeedContainer = ({ data, authorSlug }) => {
    /*
     * Filter only current author of this page. This avoids static graphql
     * striction.
     */
    const posts = data.allGhostPost.edges.filter(
        post => post.node.primary_author.slug === authorSlug
    );

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
                    `localFeatureImage.childImageSharp.fluid`,
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

AuthorPostFeedContainer.propTypes = {
    data: PropTypes.object.isRequired,
    authorSlug: PropTypes.string.isRequired
};

const AuthorPostFeedContainerQuery = props => (
    <StaticQuery
        query={graphql`
            query AuthorPostFeedContainerQuery {
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
                                        aspectRatio
                                        src
                                        srcSet
                                        sizes
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => <AuthorPostFeedContainer data={data} {...props} />}
    />
);

export default AuthorPostFeedContainerQuery;
