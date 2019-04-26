import React from "react"
import PropTypes from "prop-types"

import "./PostHeroImage.scss"

const PostHeroImage = ({ url, alt }) => (
    <img className="post-full__image" src={url} alt={alt} />
)

PostHeroImage.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}

export default PostHeroImage
