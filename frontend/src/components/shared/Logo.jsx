import React from 'react';

/**
 * A professional, minimal Typography-based Logo.
 * Uses the site's design tokens and is perfectly transparent (SVG).
 */
const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className} transition-all duration-300 hover:scale-110`}
        >
            {/* Minimalist Geometric Mark */}
            <path
                d="M20 30 L50 60 L80 30"
                stroke="var(--c-accent)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 70 L50 40 L80 70"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
            />

            {/* Signature Dot */}
            <circle cx="50" cy="50" r="8" fill="var(--c-accent)" className="animate-pulse" />
        </svg>
    );
};

export default Logo;
