import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import './PostCard.scss';

const PostCard = ({ postUrl, date, title, featuredImage }) => (
    <div className="post-card">
        <Link className="post-card__link" to={postUrl}>
            <div className="post-card__date">{date}</div>
            <div className="post-card__title">{title}</div>
            {featuredImage && (
                <div className="post-card__image-container">
                    <Img
                        className="post-card__image"
                        fluid={featuredImage}
                        alt={title}
                    />
                </div>
            )}
        </Link>
    </div>
);

PostCard.propTypes = {
    postUrl: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.object
};

export default PostCard;
