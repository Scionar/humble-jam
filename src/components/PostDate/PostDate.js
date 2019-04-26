import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import "./PostDate.scss"

const PostDate = ({ date }) => (
    <time className="post-date" dateTime={moment(date).format(`YYYY-MM-DD`)}>
        {moment(date).format(`DD MMMM, YYYY`)}
    </time>
)

PostDate.propTypes = {
    date: PropTypes.string.isRequired,
}

export default PostDate
