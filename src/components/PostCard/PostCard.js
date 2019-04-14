import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./PostCard.scss"

const PostCard = ({ postUrl, date, title, featuredImage }) => (
    <div className="post-card">
        <Link className="post-card__link" to={postUrl}>
            <div className="post-card__date">{date}</div>
            <div className="post-card__title">{title}</div>
            {featuredImage && (
                <div className="post-card__image-container">
                    <img className="post-card__image" src={featuredImage} />
                </div>
            )}
        </Link>
    </div>
)

PostCard.propTypes = {
    postUrl: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string,
}

export default PostCard
