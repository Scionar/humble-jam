import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import NavigationIcon from "../../images/menu.svg"
import "./Navigation.scss"

const Navigation = ({ data }) => (
    <nav className="navigation">
        <div className="navigation__icon">
            <NavigationIcon />
        </div>

        <ul className="navigation__links">
            {data.map((navItem, i) => {
                if (navItem.url.match(/^\s?http(s?)/gi)) {
                    return (
                        <li className="navigation__item">
                            <a
                                className="navigation__item-link"
                                href={navItem.url}
                                key={i}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {navItem.label}
                            </a>
                        </li>
                    )
                } else {
                    return (
                        <li className="navigation__item">
                            <Link
                                className="navigation__item-link"
                                to={navItem.url}
                                key={i}
                            >
                                {navItem.label}
                            </Link>
                        </li>
                    )
                }
            })}
        </ul>
    </nav>
)

Navigation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
}

export default Navigation
