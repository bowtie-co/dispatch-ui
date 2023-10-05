import React from 'react';
import sanitizeHtml from 'sanitize-html';

const sanitizeOptions = {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'div', 'br' ],
    allowedAttributes: {
      'a': [ 'href' ],
      '*': [ 'style' ]
    },
    allowedStyles: {
      '*': {
        // Match HEX and RGB
        'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
        'text-align': [/^left$/, /^right$/, /^center$/],
        // Match any number with px, em, or %
        'font-size': [/^\d+(?:px|em|%)$/]
      },
    }
};

const sanitize = (dirty, options = {}) => ({
  __html: sanitizeHtml(
    dirty,
    { ...sanitizeHtml.defaults, ...options }
  )
});

export const AppSanitizeHTML = ({ className, html, options = {}, ...props }) => {
  return (
    <div className={`AppSanitizeHTML ${className || ''}`} dangerouslySetInnerHTML={sanitize(html, sanitizeOptions)} />
  );
};
