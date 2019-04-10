import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./Header.scss"

const Header = ({ logoUrl, isHome, title, description, navigation }) => (
    <header className="header">
        <div className="header__content">
            {logoUrl && (
                <Link className="header__title-link" to="/">
                    <img className="header__logo" src={logoUrl} alt="Logo" />
                </Link>
            )}

            <div className="header__title-and-description">
                {isHome ? (
                    <h1 className="header__title">{title}</h1>
                ) : (
                    <h2 className="header__title">{title}</h2>
                )}
                <div className="header__description">{description}</div>
            </div>

            {navigation}
        </div>
    </header>
)

Header.defaultProps = {
    isHome: false,
}

Header.propTypes = {
    logoUrl: PropTypes.string,
    isHome: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    navigation: PropTypes.node,
}

export default Header
