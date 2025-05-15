import React, { useCallback } from 'react';
import { AppLogo, AppSanitizeHTML } from '../../atoms';
import { PostImage, ShareTools, ShareLink } from '../../molecules';
import { AppFooter } from '../../organisms';
import { Helmet } from "react-helmet";
const { REACT_APP_API_ROOT } = process.env;

export const ShareContainer = (props) => {
  const { theme, post } = props;
  const getThemeUploadUrl = useCallback((objectPath) => {
    return `${theme.baseUploadUrl}/${objectPath}`;
  }, [ theme ]);

  const styles = {
    container: {
      backgroundColor: theme.brandColor1,
      a: {
        color: theme.linkTextColor
      },
    },
    customPadding: {
      paddingTop: theme.paddingTop + 'px',
      paddingRight: theme.paddingRight + 'px',
      paddingBottom: theme.paddingBottom + 'px',
      paddingLeft: theme.paddingLeft + 'px',
    },
    logoStyle: {
      width: theme.brandLogoWidth || 300,
      maxWidth: '100%',
      marginTop: 0
    },
    takeawayContent: {
      backgroundImage: `url(${getThemeUploadUrl(theme.bgImage)})`,
      padding: '0 0 30px'
    },
    shareContent: {
      backgroundColor: theme.brandColor2,
      color: theme.textColor2,
      whiteSpace: 'pre-wrap'
    },
    headerContent: {
      color: theme.textColor1,
      fontSize: theme.fontSizeHeader
    },
    bodyContent: {
      color: theme.textColor2,
      fontSize: theme.fontSizePrimary
    },
    footerContent: {
      color: theme.textColor3,
      backgroundColor: theme.footerBgColor,
      fontSize: theme.fontSizeFooter,
      a: {
        color: theme.linkTextColor
      }
    },
    linkContent: {
      a: {
        color: theme.linkTextColor
      },
      color: theme.linkTextColor
      // TODO: Hookup textColor4
      // color: theme.textColor4
    },
    gaPixel: {
      img: {
        width: '0',
        height: '0',
        overflow: 'hidden',
        position: 'absolute',
        margin: '0',
        padding: '0',
        lineHeight: '0'
      }
    }
  };

  const handleSocialShareImage = () => {
    return theme.socialShareImage ? getThemeUploadUrl(theme.socialShareImage) : post.posterUrl;
  };

  return (
    <div className={'ShareContainer'} style={styles.container}>
      <Helmet>
        <title>{theme.pageMetaTitle}</title>
        <meta name='description' content={theme.pageMetaDescription} />

        {/* <!-- Open Graph data --> */}
        <meta property='og:url' content={window.location.href} />
        <meta property='og:title' content={theme.pageMetaTitle} />
        <meta property='og:description' content={theme.pageMetaDescription} />
        <meta property='og:image' content={handleSocialShareImage()} />

        {/* <!-- Twitter share data --> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={theme.pageMetaHandle} />
        <meta name="twitter:title" content={theme.pageMetaTitle} />
        <meta name="twitter:description" content={theme.pageMetaDescription} />
        <meta name="twitter:image" content={handleSocialShareImage()} />

        {/* Include dynamically built theme css overrides */}
        {theme.headerFont && <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${theme.headerFont.family}`} />}
        {theme.textFont && <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${theme.textFont.family}`} />}
        {theme.footerFont && <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${theme.footerFont.family}`} />}
        <link rel="stylesheet" type="text/css" href={`${REACT_APP_API_ROOT}/themes/important/styles.css`} />
      </Helmet>

      <div className="takeaway-content" style={styles.takeawayContent}>
        <div className='container test' style={styles.customPadding}>
          {theme.brandLogo1 && (
            <a title="brandLogo1" href={theme.logoLinkUrl ? theme.logoLinkUrl : '#brand-logo'}>
              <AppLogo className={'logo-responsive'} src={getThemeUploadUrl(theme.brandLogo1)} style={styles.logoStyle} />
            </a>
          )}
          <PostImage {...props} theme={theme} />
        </div>
      </div>

      <div className="share-content" style={styles.shareContent}>
        <div className="container" style={styles.customPadding}>
          <h2 className='header-text' style={styles.headerContent}>{theme.pageHeaderText}</h2>
          <div className='primary-text' style={styles.bodyContent}>
            <AppSanitizeHTML html={theme.pagePrimaryText} />
            <style dangerouslySetInnerHTML={{__html: `
              .primary-text a { color: ${styles.linkContent.color} }
            `}} />
          </div>
          <ShareLink styles={styles} {...props} />
          {theme.swapShareContent && (
            <ShareTools {...props} />
          )}
          <div className={`disclaimer-text mt-4 mb-0 ${!theme.swapShareContent ? 'mt-0 mb-4' : 'mt-4 mb-0' }`}>
            <AppSanitizeHTML html={theme.pageDisclaimerText} />
          </div>
          {!theme.swapShareContent && (
            <ShareTools {...props} />
          )}
        </div>
      </div>
      <AppFooter {...props} {...{ styles, getThemeUploadUrl }} />
      <style dangerouslySetInnerHTML={{__html: `
        .primary-text a, div.AppSanitizeHTML > div > a, .disclaimer-text a { color: ${styles.linkContent.color} }
      `}} />
    </div>
  );
};
