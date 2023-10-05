import React from 'react';
import { AppSanitizeHTML } from '../../atoms';

export const AppFooter = ({ children, ...props }) => {
  const { theme, styles, getThemeUploadUrl } = props;

  return (
    <div className='AppFooter' style={styles.footerContent}>
      <div className='container' style={styles.customPadding}>
        {theme.brandLogo2 && (
          <img className={'brand-logo-2'} src={getThemeUploadUrl(theme.brandLogo2)} alt="brandLogo2"></img>
        )}
      <div style={styles.footerContent}>
        <AppSanitizeHTML html={theme.pageFooterText} />
      </div>
      </div>
    </div>
  );
};
