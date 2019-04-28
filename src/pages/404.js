import React from "react"
import { Link } from "gatsby"
import { LayoutContainer } from "../containers"

const NotFoundPage = () => (
    <LayoutContainer>
        <h1 className="content-title">Error 404</h1>
        <section className="content-body">
            Page not found, <Link to="/">return home</Link> to start over
        </section>
    </LayoutContainer>
)

export default NotFoundPage
