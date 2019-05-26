import React from 'react';
import PropTypes from 'prop-types';

import FacebookIcon from '../../images/facebook.svg';
import TwitterIcon from '../../images/twitter.svg';
import RssIcon from '../../images/rss.svg';
import './Footer.scss';

const Footer = ({ siteTitle, facebookUrl, twitterUrl, rssUrl, year }) => (
    <footer className="footer">
        <div className="footer__content">
            <section className="footer__copyright">
                {siteTitle} &copy; {year}
            </section>
            <nav className="footer__some-links">
                {facebookUrl && (
                    <a
                        className="footer__some-link-item"
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FacebookIcon alt="Facebook logo" />
                    </a>
                )}
                {twitterUrl && (
                    <a
                        className="footer__some-link-item"
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <TwitterIcon alt="Twitter logo" />
                    </a>
                )}
                {rssUrl && (
                    <a
                        className="footer__some-link-item"
                        href={rssUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RssIcon alt="RSS Feed" />
                    </a>
                )}
            </nav>
        </div>
    </footer>
);

Footer.propTypes = {
    siteTitle: PropTypes.string.isRequired,
    facebookUrl: PropTypes.string,
    twitterUrl: PropTypes.string,
    rssUrl: PropTypes.string,
    year: PropTypes.string
};

export default Footer;
