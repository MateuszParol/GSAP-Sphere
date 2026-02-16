import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, type = 'website', name = 'Mateusz Parol' }) => {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title} | {name}</title>
            <meta name='description' content={description} />

            {/* Open Graph tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={`${title} | ${name}`} />
            <meta property="og:description" content={description} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${title} | ${name}`} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;
