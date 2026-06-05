import React, { Fragment, useState } from 'react';
import { Card, Row, Col, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { ButtonBasic, SimpleDivider } from '../../atoms';
import FontPicker from 'font-picker-react';
import Select from 'react-select';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { ThemeFileUpload } from '../../molecules/Theme';
import { defaultFont } from '../../lib';

const { REACT_APP_GOOGLE_FONTS_API_KEY } = process.env;

// TODO: Update list of required font variants? limit possible options
const FONT_REQUIRED_VARIANTS = [ 'regular' ];
// const FONT_REQUIRED_FIELDS = [ 'id', 'family', 'category', 'files' ];

export const ThemeForm = (props) => {
  const { theme, submit, activateTheme, multiThemeEnabled } = props;



  const expandOptions = (options = []) => options.map(opt => ({ value: opt, label: opt }));
  const selectOptions = (values, defaults = []) => expandOptions(values || defaults);
  const variantOptions = (font) => selectOptions(font.variants, FONT_REQUIRED_VARIANTS);
  const fixFontFileUrl = (file) => file.replace(/^http:\/\//, 'https://');
  const safeUpdateFont = (font, updateFont) => {
    const fontData = { ...font };

    if (fontData && typeof fontData.files === 'object') {
      Object.keys(fontData.files).forEach((variant) => {
        Object.assign(fontData.files, {
          [variant]: fixFontFileUrl(fontData.files[variant])
        });
      });
    }

    updateFont(fontData);
  };

  const fontPickerProps = (fieldName, currentFont, updateFont) => ({
    id: fieldName,
    name: fieldName,
    pickerId: fieldName,
    apiKey: REACT_APP_GOOGLE_FONTS_API_KEY,
    variants: FONT_REQUIRED_VARIANTS,
    filter: ({ id, family, category, files }) => !!(id && family && category && files),
    // TODO: Dynamic field checks
    // filter: (font) => Object.keys(FONT_REQUIRED_FIELDS).every(key => !!font[key]),
    activeFontFamily: currentFont.family,
    onChange: (font) => safeUpdateFont(font, updateFont),
  });

  const fontVariantSelectProps = (fieldName, currentFont, updateFont) => ({
    id: fieldName,
    type: 'text',
    name: fieldName,
    options: variantOptions(currentFont),
    onChange: (e) => safeUpdateFont({ ...currentFont, variant: e.value }, updateFont),
    defaultValue: {
      value: currentFont.variant,
      label: currentFont.variant
    }
  });

  const [ logoLinkUrl, setLogoLinkUrl ] = useState(theme.logoLinkUrl);
  const [ projectName, setProjectName ] = useState(theme.projectName);
  // const [ frontendUrl, setFrontendUrl ] = useState(theme.frontendUrl);

  const [ brandLogo1, setBrandLogo1 ] = useState(theme.brandLogo1);
  const [ brandLogoWidth, setBrandLogoWidth ] = useState(theme.brandLogoWidth);
  const [ brandLogo2, setBrandLogo2 ] = useState(theme.brandLogo2);
  const [ bgImage, setBgImage ] = useState(theme.bgImage);
  const [ bgImageMobile, setBgImageMobile ] = useState(theme.bgImageMobile);
  const [ headerImage, setHeaderImage ] = useState(theme.headerImage);
  const [ takeawayVideoThumbnailImage, setTakeawayVideoThumbnailImage ] = useState(theme.takeawayVideoThumbnailImage);

  const [ paddingTop, setPaddingTop ] = useState(typeof theme.paddingTop !== 'undefined' ? theme.paddingTop : 30);
  const [ paddingRight, setPaddingRight ] = useState(typeof theme.paddingRight !== 'undefined' ? theme.paddingRight : 30);
  const [ paddingBottom, setPaddingBottom ] = useState(typeof theme.paddingBottom !== 'undefined' ? theme.paddingBottom : 30);
  const [ paddingLeft, setPaddingLeft ] = useState(typeof theme.paddingLeft !== 'undefined' ? theme.paddingLeft : 30);
  const [ borderColor, setBorderColor ] = useState(theme.borderColor || '#cccccc');
  const [ imageBorderColor, setImageBorderColor ] = useState(theme.imageBorderColor || '#000000');
  const [ enableImageBorder, setEnableImageBorder ] = useState(!!theme.enableImageBorder);
  const [ brandColor1, setBrandColor1 ] = useState(theme.brandColor1 || '#f8f8f8');
  const [ brandColor2, setBrandColor2 ] = useState(theme.brandColor2) || '#f8f8f8';

  // Font Style related fields
  const [ textColor1, setTextColor1 ] = useState(theme.textColor1 || '#000000');
  const [ textColor2, setTextColor2 ] = useState(theme.textColor2 || '#000000');
  const [ textColor3, setTextColor3 ] = useState(theme.textColor3 || '#000000');
  // const [ textColor4, setTextColor4 ] = useState(theme.textColor4 || '#000000');
  const [ footerBgColor, setFooterBgColor ] = useState(theme.footerBgColor || '#ffffff');
  const [ linkTextColor, setLinkTextColor ] = useState(theme.linkTextColor || '#000000');
  const [ pageHeaderText, setPageHeaderText ] = useState(theme.pageHeaderText);
  const [ pagePrimaryText, setPagePrimaryText ] = useState(theme.pagePrimaryText);
  const [ pageFooterText, setPageFooterText ] = useState(theme.pageFooterText);
  const [ fontSizeHeader, setFontSizeHeader ] = useState(theme.fontSizeHeader);
  const [ fontSizePrimary, setFontSizePrimary ] = useState(theme.fontSizePrimary);
  const [ fontSizeFooter, setFontSizeFooter ] = useState(theme.fontSizeFooter);

  const [ pageDisclaimerText, setPageDisclaimerText ] = useState(theme.pageDisclaimerText);
  const [ emailSubjectText, setEmailSubjectText ] = useState(theme.emailSubjectText);
  const [ pageMetaTitle, setPageMetaTitle ] = useState(theme.pageMetaTitle);
  const [ pageMetaHandle, setPageMetaHandle ] = useState(theme.pageMetaHandle);
  const [ pageMetaDescription, setPageMetaDescription ] = useState(theme.pageMetaDescription);
  const [ socialShareImage, setSocialShareImage ] = useState(theme.socialShareImage);
  // const [ brandFbAcct, setBrandFbAcct ] = useState(theme.brandFbAcct);
  // const [ brandIgAcct, setBrandIgAcct ] = useState(theme.brandIgAcct);
  // const [ brandTwitterAct, setBrandTwitterAct ] = useState(theme.brandTwitterAct);
  const [ facebookIconImage, setFacebookIconImage ] = useState(theme.facebookIconImage);
  const [ twitterIconImage, setTwitterIconImage ] = useState(theme.twitterIconImage);
  const [ downloadIconImage, setDownloadIconImage ] = useState(theme.downloadIconImage);
  const [ swapShareContent, setSwapShareContent ] = useState(theme.swapShareContent);
  const [ shareButtonText, setShareButtonText ] = useState(theme.shareButtonText);
  const [ shareTitleText, setShareTitleText ] = useState(theme.shareTitleText);
  const [ shareTagText, setShareTagText ] = useState(theme.shareTagText);

  const [ approvalQueueApproveMsg, setApprovalQueueApproveMsg ] = useState(theme.approvalQueueApproveMsg);
  const [ approvalQueueDenyMsg, setApprovalQueueDenyMsg ] = useState(theme.approvalQueueDenyMsg);
  const [ primaryHeaderTextFont, setPrimaryHeaderTextFont ] = useState(theme.headerFont || defaultFont);
  const [ primaryTextFont, setPrimaryTextFont ] = useState(theme.textFont || defaultFont);
  const [ footerTextFont, setFooterTextFont ] = useState(theme.footerFont || defaultFont);

  const payload = {
    projectName,
    logoLinkUrl,
    // frontendUrl,
    brandLogo1,
    brandLogoWidth,
    brandLogo2,
    bgImage,
    bgImageMobile,
    headerImage,
    takeawayVideoThumbnailImage,
    borderColor,
    brandColor1,
    brandColor2,
    textColor1,
    textColor2,
    textColor3,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    imageBorderColor,
    enableImageBorder,
    // textColor4,
    footerBgColor,
    linkTextColor,
    pageHeaderText,
    pagePrimaryText,
    pageFooterText,
    fontSizeHeader,
    fontSizePrimary,
    fontSizeFooter,
    pageDisclaimerText,
    emailSubjectText,
    pageMetaTitle,
    pageMetaHandle,
    pageMetaDescription,
    socialShareImage,
    // brandFbAcct,
    // brandIgAcct,
    // brandTwitterAct,
    facebookIconImage,
    twitterIconImage,
    downloadIconImage,
    swapShareContent,
    shareButtonText,
    shareTitleText,
    shareTagText,
    enableDownloadLink: true,
    approvalQueueApproveMsg,
    approvalQueueDenyMsg,
    headerFont: primaryHeaderTextFont,
    footerFont: footerTextFont,
    textFont: primaryTextFont
  };

  return (
    <div className={'ThemeEdit'}>
      <Container fluid>
        <Fragment>
          <Form onSubmit={(e) => submit(e, payload)}>
            <Card>
              <FormGroup row>
                <Label md={4} lg={3} for='projectName'>Project Name</Label>
                <Col md={8}>
                  <Input key='projectName' required type='text' name='projectName' id='projectName' onChange={(e) => setProjectName(e.target.value)} defaultValue={projectName} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='logoLinkUrl'>Logo Link</Label>
                <Col md={8}>
                  <Input key='logoLinkUrl' type='text' name='logoLinkUrl' id='logoLinkUrl'onChange={(e) => setLogoLinkUrl(e.target.value)} defaultValue={logoLinkUrl}/>
                </Col>
              </FormGroup>
              <FormGroup row></FormGroup>
            </Card>

            <Card>
              <FormGroup row>
                <Label md={4} lg={3} for='bgImage'>Page Background Image</Label>
                <ThemeFileUpload setUploadFile={setBgImage} imageField={bgImage} theme={theme} />
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='bgImageMobile'>Page Background Image Mobile</Label>
                <ThemeFileUpload setUploadFile={setBgImageMobile} imageField={bgImageMobile} theme={theme} />
              </FormGroup>

            </Card>

            <Card>
              <FormGroup row>
                <Label md={4} lg={3} for='headerImage'>Email Header Image<br /><small className='text-muted'>700px width</small></Label>
                <ThemeFileUpload setUploadFile={setHeaderImage} imageField={headerImage} theme={theme} />
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='brandLogo1'>Page Header Logo</Label>
                <ThemeFileUpload setUploadFile={setBrandLogo1} imageField={brandLogo1} theme={theme} />
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='brandLogoWidth'>Page Header Logo Max Width</Label>
                <Col md={4} lg={3} >
                  <Input key='brandLogoWidth' type='number' name='brandLogoWidth' id='brandLogoWidth' onChange={(e) => setBrandLogoWidth(e.target.value)} defaultValue={brandLogoWidth} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='brandLogo2'>Page Footer Logo</Label>
                <ThemeFileUpload setUploadFile={setBrandLogo2} imageField={brandLogo2} theme={theme} />
              </FormGroup>
              <Row>
              <FormGroup className={`col-sm-6 col-lg-3 row`}>
                <Label md={12}for='borderColor'>Border Color</Label>
                <Col md={12}>
                  <div>
                    <HexColorPicker color={borderColor} onChange={setBorderColor} />
                    <Col className={`hex-input-wrap`}>
                      <HexColorInput className="hex-input" color={borderColor} onChange={setBorderColor} />
                    </Col>
                  </div>
                </Col>
              </FormGroup>
              <FormGroup className={`col-sm-6 col-lg-3 row`}>
                <Label md={12}for='brandColor1'>Upper BG Color</Label>
                <Col md={12}>
                  <div>
                    <HexColorPicker color={brandColor1} onChange={setBrandColor1} />
                    <Col className={`hex-input-wrap`}>
                      <HexColorInput className="hex-input" color={brandColor1} onChange={setBrandColor1} />
                    </Col>
                  </div>
                </Col>
              </FormGroup>
              <FormGroup className={`col-sm-6 col-lg-3 row`}>
                <Label md={12}for='brandColor2'>Main BG Color</Label>
                <Col md={12}>
                  <div>
                    <HexColorPicker color={brandColor2} onChange={setBrandColor2} />
                    <Col className={`hex-input-wrap`}>
                      <HexColorInput className="hex-input" color={brandColor2} onChange={setBrandColor2} />
                    </Col>
                  </div>
                </Col>
              </FormGroup>
              <FormGroup className={`col-sm-6 col-lg-3 row`}>
                <Label md={12}for='footerBgColor'>Footer BG Color</Label>
                <Col md={12}>
                  <div>
                    <HexColorPicker color={footerBgColor} onChange={setFooterBgColor} />
                    <Col className={`hex-input-wrap`}>
                      <HexColorInput className="hex-input" color={footerBgColor} onChange={setFooterBgColor} />
                    </Col>
                  </div>
                </Col>
              </FormGroup>
              </Row>
            </Card>

            <Card>
              <Row>
                <FormGroup className={`col-12 row`}>
                  <Label  xs={3}>Section Padding<br /><small className='text-muted'>Controls padding for body and footer in px</small></Label>
                  <Col xs={2}>
                    <div style={{
                      paddingBottom: "1em",
                    }}>
                      <Label>Top</Label>
                      <Input key='paddingTop' type='number' name='paddingTop' id='paddingTop' onChange={(e) => setPaddingTop(e.target.value)} defaultValue={paddingTop}/>
                    </div>
                  </Col>
                  <Col xs={2}>
                    <div style={{
                      paddingBottom: "1em",
                    }}>
                      <Label>Right</Label>
                      <Input key='paddingRight' type='number' name='paddingRight' id='paddingRight' onChange={(e) => setPaddingRight(e.target.value)} defaultValue={paddingRight}/>
                    </div>
                  </Col>
                  <Col xs={2}>
                    <div style={{
                      paddingBottom: "1em",
                    }}>
                      <Label>Bottom</Label>
                      <Input key='paddingBottom' type='number' name='paddingBottom' id='paddingBottom' onChange={(e) => setPaddingBottom(e.target.value)} defaultValue={paddingBottom}/>
                    </div>
                  </Col>
                  <Col xs={2}>
                    <div style={{
                      paddingBottom: "1em",
                    }}>
                      <Label>Left</Label>
                      <Input key='paddingLeft' type='number' name='paddingLeft' id='paddingLeft' onChange={(e) => setPaddingLeft(e.target.value)} defaultValue={paddingLeft}/>
                    </div>
                  </Col>
                </FormGroup>
              </Row>
            </Card>

            <Card>
              <Row>
                <FormGroup className={`col-12 row`}>
                  <Label  xs={3} for='enableImageBorder'>Enable Image Border<br /><small className='text-muted'>Add Border on Image and/or Video Thumbnail</small></Label>
                  <Col xs={1}>
                    <div style={{
                      paddingBottom: "1em",
                    }}>
                      <Input key='enableImageBorder' type='checkbox' name='enableImageBorder' id='enableImageBorder' onChange={(e) => setEnableImageBorder(e.target.checked)} checked={enableImageBorder}/>
                    </div>
                  </Col>
                </FormGroup>
                {enableImageBorder && (
                  <FormGroup className={`col-sm-6 col-lg-3 row`}>
                    <Label md={12}for='borderColor'>Image Border Color</Label>
                    <Col md={12}>
                      <div>
                        <HexColorPicker color={imageBorderColor} onChange={setImageBorderColor} />
                        <Col className={`hex-input-wrap`}>
                          <HexColorInput className="hex-input" color={imageBorderColor} onChange={setImageBorderColor} />
                        </Col>
                      </div>
                    </Col>
                  </FormGroup>
                )}
              </Row>
            </Card>

            <Card>
              <Row>
                <FormGroup className={`col-sm-6 col-lg-3 row`}>
                  <Label md={12}for='textColor1'>Header Text Color</Label>
                  <Col md={12}>
                    <div>
                      <HexColorPicker color={textColor1} onChange={setTextColor1} />
                      <Col className={`hex-input-wrap`}>
                        <HexColorInput className="hex-input" color={textColor1} onChange={setTextColor1} />
                      </Col>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup className={`col-sm-6 col-lg-3 row`}>
                  <Label md={12}for='textColor2'>Body Text Color</Label>
                  <Col md={12}>
                    <div>
                      <HexColorPicker color={textColor2} onChange={setTextColor2} />
                      <Col className={`hex-input-wrap`}>
                        <HexColorInput className="hex-input" color={textColor2} onChange={setTextColor2} />
                      </Col>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup className={`col-sm-6 col-lg-3 row`}>
                  <Label md={12}for='textColor3'>Footer Text Color</Label>
                  <Col md={12}>
                    <div>
                      <HexColorPicker color={textColor3} onChange={setTextColor3} />
                      <Col className={`hex-input-wrap`}>
                        <HexColorInput className="hex-input" color={textColor3} onChange={setTextColor3} />
                      </Col>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup className={`col-sm-6 col-lg-3 row`}>
                  <Label md={12}for='linkTextColor'>Link Text Color</Label>
                  <Col md={12}>
                    <div>
                      <HexColorPicker color={linkTextColor} onChange={setLinkTextColor} />
                      <Col className={`hex-input-wrap`}>
                        <HexColorInput className="hex-input" color={linkTextColor} onChange={setLinkTextColor} />
                      </Col>
                    </div>
                  </Col>
                </FormGroup>
              </Row>
            </Card>

            <Card>
              <FormGroup row>
                <Label md={4} lg={3} for='pageHeaderText'>Header Intro Text</Label>
                <Col md={8}>
                  <Input key='pageHeaderText'  type='textarea' name='pageHeaderText' id='pageHeaderText' className='apply-font-primaryHeaderTextFont'
                    onChange={(e) => setPageHeaderText(e.target.value)} defaultValue={pageHeaderText}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='primaryHeaderTextFont'>Header Text Font</Label>
                <Col md={3} sm={4}>
                  <FontPicker {...fontPickerProps('primaryHeaderTextFont', primaryHeaderTextFont, setPrimaryHeaderTextFont)} />
                </Col>
                <Label lg={1} className='d-sm-none d-lg-block'>
                  Style
                </Label>
                <Col lg={4} sm={5}>
                  <Select {...fontVariantSelectProps('primaryHeaderTextFont', primaryHeaderTextFont, setPrimaryHeaderTextFont)} />
                </Col>
              </FormGroup>
              <FormGroup row>
              <Label lg={3} className='d-sm-none d-lg-block'>
                  Header Text Size<br/>
                  <small>Default 16px</small>
                </Label>
                <Col lg={3} sm={5}>
                  <Input key='fontSizeHeader' id='fontSizeHeader' name='fontSizeHeader'type="number"
                    onChange={(e) => setFontSizeHeader(e.target.value)} defaultValue={fontSizeHeader}/>
                </Col>
              </FormGroup>
              <SimpleDivider/>
              <FormGroup row>
                <Label md={4} lg={3} for='pagePrimaryText'>Page Primary Text</Label>
                <Col md={8}>
                  <Input key='pagePrimaryText' type='textarea' name='pagePrimaryText' id='pagePrimaryText' className='apply-font-primaryTextFont'
                    onChange={(e) => setPagePrimaryText(e.target.value)} defaultValue={pagePrimaryText}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='primaryTextFont'>Primary Text Font</Label>
                <Col md={3} sm={4}>
                  <FontPicker {...fontPickerProps('primaryTextFont', primaryTextFont, setPrimaryTextFont)} />
                </Col>
                <Label lg={1} className='d-sm-none d-lg-block'>
                  Style
                </Label>
                <Col lg={4} sm={5}>
                  <Select {...fontVariantSelectProps('primaryTextFont', primaryTextFont, setPrimaryTextFont)} />
                </Col>
              </FormGroup>
              <FormGroup row>
              <Label lg={3} className='d-sm-none d-lg-block'>
                  Primary Text Size<br/>
                  <small>Default 12px</small>
                </Label>
                <Col lg={3} sm={5}>
                  <Input key='fontSizePrimary' id='fontSizePrimary' name='fontSizePrimary'type="number"
                    onChange={(e) => setFontSizePrimary(e.target.value)} defaultValue={fontSizePrimary}/>
                </Col>
              </FormGroup>
              <SimpleDivider/>
              <FormGroup row>
                <Label md={4} lg={3} for='pageFooterText'>Page Footer Text/html</Label>
                <Col md={8}>
                  <Input key='pageFooterText' type='textarea' name='pageFooterText' id='pageFooterText' className='apply-font-footerTextFont'
                    onChange={(e) => setPageFooterText(e.target.value)} defaultValue={pageFooterText}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='footerTextFont'>Footer Text Font</Label>
                <Col md={3} sm={4}>
                  <FontPicker {...fontPickerProps('footerTextFont', footerTextFont, setFooterTextFont)} />
                </Col>
                <Label lg={1} className='d-sm-none d-lg-block'>
                  Style
                </Label>
                <Col lg={4} sm={5}>
                  <Select {...fontVariantSelectProps('footerTextFont', footerTextFont, setFooterTextFont)} />
                </Col>
              </FormGroup>
              <FormGroup row>
              <Label lg={3} className='d-sm-none d-lg-block'>
                  Footer Text Size<br/>
                  <small>Default 10px</small>
                </Label>
                <Col lg={3} sm={5}>
                  <Input key='fontSizeFooter' id='fontSizeFooter' name='fontSizeFooter'type="number"
                    onChange={(e) => setFontSizeFooter(e.target.value)} defaultValue={fontSizeFooter}/>
                </Col>
              </FormGroup>
            </Card>
            <Card>
              <FormGroup row>
                <Label md={4} lg={3} for='emailSubjectText'>Email Subject Text</Label>
                <Col md={8}>
                  <Input key='emailSubjectText' type='text' name='emailSubjectText' id='emailSubjectText' onChange={(e) => setEmailSubjectText(e.target.value)} defaultValue={emailSubjectText}/>
                </Col>
              </FormGroup>
            </Card>
            <Card>
              <FormGroup row>
                <Label md={4} lg={3} for='takeawayVideoThumbnailImage'>Takeaway Video Thumbnail Image</Label>
                <ThemeFileUpload setUploadFile={setTakeawayVideoThumbnailImage} imageField={takeawayVideoThumbnailImage} theme={theme} />
              </FormGroup>
            </Card>
            <Card>
              <FormGroup row>
                <Label md={4} lg={3} for='pageMetaTitle'>Page Meta Title</Label>
                <Col md={8}>
                  <Input key='pageMetaTitle' type='text' name='pageMetaTitle' id='pageMetaTitle' onChange={(e) => setPageMetaTitle(e.target.value)} defaultValue={pageMetaTitle}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='pageMetaHandle'>Page Meta Handle</Label>
                <Col md={8}>
                  <Input key='pageMetaHandle' type='text' name='pageMetaHandle' id='pageMetaHandle' onChange={(e) => setPageMetaHandle(e.target.value)} defaultValue={pageMetaHandle} placeholder="@Example" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='pageMetaDescription'>Page Meta Description</Label>
                <Col md={8}>
                  <Input key='pageMetaDescription' type='text' name='pageMetaDescription' id='pageMetaDescription' onChange={(e) => setPageMetaDescription(e.target.value)} defaultValue={pageMetaDescription}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='socialShareImage'>Social Share Image</Label>
                <ThemeFileUpload setUploadFile={setSocialShareImage} imageField={socialShareImage} theme={theme} />
              </FormGroup>
            </Card>



          {/* <Card>
            <FormGroup row>
              <Label md={4} lg={3} for='brandFbAcct'>Brand Facebook Account</Label>
              <Col md={8}>
                <Input key='brandFbAcct' type='text' name='brandFbAcct' id='brandFbAcct' onChange={(e) => setBrandFbAcct(e.target.value)} defaultValue={brandFbAcct}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={4} lg={3} for='brandIgAcct'>Brand Instagram Account</Label>
              <Col md={8}>
                <Input key='brandIgAcct' type='text' name='brandIgAcct' id='brandIgAcct' onChange={(e) => setBrandIgAcct(e.target.value)} defaultValue={brandIgAcct}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={4} lg={3} for='brandTwitterAct'>Brand Twitter Account</Label>
              <Col md={8}>
                <Input key='brandTwitterAct' type='text' name='brandTwitterAct' id='brandTwitterAct' onChange={(e) => setBrandTwitterAct(e.target.value)} defaultValue={brandTwitterAct}/>
              </Col>
            </FormGroup>
          </Card> */}

            <Card>
              <FormGroup row>
                <Label md={4} lg={3} for='shareButtonText'>Share Button Text</Label>
                <Col md={8}>
                  <Input key='shareButtonText' type='text' name='shareButtonText' id='shareButtonText' onChange={(e) => setShareButtonText(e.target.value)} defaultValue={shareButtonText} placeholder='Click to Share' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='shareTitleText'>Share Title Text</Label>
                <Col md={8}>
                  <Input key='shareTitleText' type='text' name='shareTitleText' id='shareTitleText' onChange={(e) => setShareTitleText(e.target.value)} defaultValue={shareTitleText} placeholder='Dispatch Video / Dispatch Image' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='shareTagText'>Share Tag Text</Label>
                <Col md={8}>
                  <Input key='shareTagText' type='text' name='shareTagText' id='shareTagText' onChange={(e) => setShareTagText(e.target.value)} defaultValue={shareTagText} placeholder='Share your keepsake and tag us!' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='pageDisclaimerText'>Share Text</Label>
                <Col md={8}>
                  <Input key='pageDisclaimerText' type='textarea' name='pageDisclaimerText' id='pageDisclaimerText' onChange={(e) => setPageDisclaimerText(e.target.value)} defaultValue={pageDisclaimerText}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='bgImage'>Brand Facebook Icon Image</Label>
                <ThemeFileUpload icon setUploadFile={setFacebookIconImage} imageField={facebookIconImage} theme={theme} />
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='bgImageMobile'>Brand Twitter Icon Image</Label>
                <ThemeFileUpload icon setUploadFile={setTwitterIconImage} imageField={twitterIconImage} theme={theme} />
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='bgImageMobile'>Brand Download Icon Image</Label>
                <ThemeFileUpload icon setUploadFile={setDownloadIconImage} imageField={downloadIconImage} theme={theme} />
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='swapShareContent'>
                  Swap share text &amp; icons? <br />
                  <small className='text-muted'>
                    Share text will display: <br />
                    <strong>{swapShareContent ? 'BELOW' : 'ABOVE'}</strong> social share icons
                  </small>
                </Label>
                <Col md={8}>
                  <Input key='swapShareContent' type='checkbox' name='swapShareContent' id='swapShareContent' onChange={(e) => setSwapShareContent(e.target.checked)} checked={swapShareContent} />
                </Col>
              </FormGroup>
            </Card>

            <Card>
              <FormGroup row>
                <Label md={4} lg={3} for='approvalQueueApproveMsg'>Approval Queue Approve Message</Label>
                <Col md={8}>
                  <Input key='approvalQueueApproveMsg' type='text' name='approvalQueueApproveMsg' id='approvalQueueApproveMsg' onChange={(e) => setApprovalQueueApproveMsg(e.target.value)} defaultValue={approvalQueueApproveMsg}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} lg={3} for='approvalQueueDenyMsg'>Approval Queue Deny Message</Label>
                <Col md={8}>
                  <Input key='approvalQueueDenyMsg' type='text' name='approvalQueueDenyMsg' id='approvalQueueDenyMsg' onChange={(e) => setApprovalQueueDenyMsg(e.target.value)} defaultValue={approvalQueueDenyMsg}/>
                </Col>
              </FormGroup>
            </Card>

            <ButtonBasic>Save</ButtonBasic>
            {multiThemeEnabled && <ButtonBasic className={'btn-secondary'} onClick={(e) => activateTheme(e)}>Publish</ButtonBasic>}
          </Form>
        </Fragment>
      </Container>
    </div>
  );
};
