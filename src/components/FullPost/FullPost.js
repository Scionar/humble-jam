import React from 'react';
import PropTypes from 'prop-types';

import './FullPost.scss';

const FullPost = ({ heroImageUrl, title, date, children }) => (
    <article className="post">
        <header className="post-full__header">
            <section className="post-full__meta">
                <time className="post-full__meta-date" dateTime="">
                    {date}
                </time>
            </section>

            <h1 className="post-full__title">{title}</h1>

            {heroImageUrl && (
                <img className="post-full__image" src={heroImageUrl} />
            )}
        </header>

        <main className="post-full__content" role="main">
            {children}
        </main>

        {/* Disqus comments */}
    </article>
);

FullPost.propTypes = {
    heroImageUrl: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default FullPost;
