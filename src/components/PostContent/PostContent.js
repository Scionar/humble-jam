import React from "react"
import PropTypes from "prop-types"

import "./PostContent.scss"

const PostContent = ({ children, html }) => (
    <main
        className="post-content load-external-scripts"
        role="main"
        dangerouslySetInnerHTML={{ __html: html }}
    >
        {children}
    </main>
)

PostContent.propTypes = {
    children: PropTypes.node,
    html: PropTypes.node,
}

export default PostContent
