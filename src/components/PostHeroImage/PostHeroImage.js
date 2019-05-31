import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import './PostHeroImage.scss';

const PostHeroImage = ({ image, alt }) => (
    <Img className="post-hero-image" fluid={image} alt={alt} />
);

PostHeroImage.propTypes = {
    image: PropTypes.object.isRequired,
    alt: PropTypes.string.isRequired
};

export default PostHeroImage;
