import React, { useEffect, useState, useCallback } from 'react';
import { WithChildren, WithDevice, WithNav } from '.';
import { ga, language } from '../../lib';

export const WithApp = ({ children, ...props }) => {
  const [ lang, setLang ] = useState('en');

  const translate = useCallback((key) => {
    const data = language[lang];
    const parts = key.split('.');
    let pointer = data;

    if (!data) {
      throw new Error(`Invalid language: ${lang}`);
    }

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (pointer[part]) {
        pointer = pointer[part];
      }
    }

    return pointer;
  }, [ lang ]);

  useEffect(() => {
    ga.init();
  }, []);

  const appProps = {
    languages: Object.keys(language),
    lang,
    setLang,
    translate,
  };

  return (
    // TODO: @Charlie - Is there a better place to include this?
    <WithDevice>
      {/* <WithBrand {...props} {...appProps}> */}
        <WithNav {...props} {...appProps}>
          <WithChildren children={children} {...props} {...appProps} />
        </WithNav>
      {/* </WithBrand> */}
    </WithDevice>
  );
};
