import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import './FullPost.scss';

const FullPost = ({ heroImage, title, date, children }) => (
    <article className="post">
        <header className="post-full__header">
            <section className="post-full__meta">
                <time className="post-full__meta-date" dateTime="">
                    {date}
                </time>
            </section>

            <h1 className="post-full__title">{title}</h1>

            {heroImage && (
                <Img
                    className="post-full__image"
                    fluid={heroImage}
                    alt={title}
                />
            )}
        </header>

        <main className="post-full__content" role="main">
            {children}
        </main>

        {/* Disqus comments */}
    </article>
);

FullPost.propTypes = {
    heroImage: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default FullPost;
