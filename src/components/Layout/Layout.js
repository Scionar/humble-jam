import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/base.scss';
import './Layout.scss';

const Layout = ({ children, header, footer }) => (
    <>
        {header}
        <main className="layout" role="main">
            <div className="layout__content">{children}</div>
        </main>
        {footer}
    </>
);

Layout.propTypes = {
    header: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node.isRequired
};

export default Layout;
