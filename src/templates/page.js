import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { PostDate, PostHeroImage, PostContent, MetaData } from "../components"
import { LayoutContainer } from '../containers'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location }) => {
    const page = data.ghostPage

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
            />
            <LayoutContainer>
                <PostDate date={page.published_at} />
                <h1>{page.title}</h1>
                <PostHeroImage url={page.feature_image} alt={page.title} />
                <PostContent html={page.html} />
            </LayoutContainer>
        </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            published_at: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
