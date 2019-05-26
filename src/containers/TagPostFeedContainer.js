import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import moment from 'moment';

import { PostCard } from '../components';

const TagPostFeedContainer = ({ data, tagSlug }) => {
    /*
     * Filter only current tagged posts of this page. This avoids static graphql
     * striction.
     */
    const posts = data.allGhostPost.edges.filter(post => {
        const postTags = post.node.tags;
        for (let index = 0; index < postTags.length; index++) {
            const currentTagSlug = postTags[index].slug;
            if (currentTagSlug === tagSlug) {
                return true;
            }
        }
        return false;
    });

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

TagPostFeedContainer.propTypes = {
    data: PropTypes.object.isRequired,
    tagSlug: PropTypes.string.isRequired
};

const TagPostFeedContainerQuery = props => (
    <StaticQuery
        query={graphql`
            query TagPostFeedContainerQuery {
                allGhostPost(sort: { order: DESC, fields: [published_at] }) {
                    edges {
                        node {
                            ...GhostPostFields
                        }
                    }
                }
            }
        `}
        render={data => <TagPostFeedContainer data={data} {...props} />}
    />
);

export default TagPostFeedContainerQuery;
