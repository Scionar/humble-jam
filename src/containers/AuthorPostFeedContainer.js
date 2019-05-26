import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import moment from 'moment';

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
                const postImage = node.feature_image;

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
                        }
                    }
                }
            }
        `}
        render={data => <AuthorPostFeedContainer data={data} {...props} />}
    />
);

export default AuthorPostFeedContainerQuery;
