import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { get } from 'lodash';

import { PostDate, PostHeroImage, PostContent, MetaData } from '../components';
import { LayoutContainer } from '../containers';

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location }) => {
    const page = data.ghostPage;

    const pageImage = get(
        page,
        `localFeatureImage.childImageSharp.fluid.src`,
        null
    );

    return (
        <>
            <MetaData data={data} location={location} type="website" />
            <LayoutContainer>
                <PostDate date={page.published_at} />
                <h1>{page.title}</h1>
                {pageImage && (
                    <PostHeroImage url={pageImage} alt={page.title} />
                )}
                <PostContent html={page.html} />
            </LayoutContainer>
        </>
    );
};

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            published_at: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string
        }).isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
};

export default Page;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
            localFeatureImage {
                childImageSharp {
                    fluid(maxWidth: 750, cropFocus: CENTER) {
                        src
                    }
                }
            }
        }
    }
`;
