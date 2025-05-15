import React from "react";
import { shallow } from 'enzyme';
import { ShareContainer, AppFooter } from '../../../organisms';
import { PostImage } from '../../../molecules';
import { AppLogo, AppSanitizeHTML } from '../../../atoms';

const mockProps = {
  theme: {
    pageHeaderText: 'header text',
    pagePrimaryText: 'primary text',
    pageFooterText: 'footer text',
    pageDisclaimerText: 'disclaimer text',
    bgImage: 'image',
    brandLogoWidth: 300,
    headerImage: 'header',
    brandColor1: 'black',
    brandColor2: 'red',
    textColor1: 'black',
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    fontSizeHeader: 32,
    fontSizePrimary: 16,
    fontSizeFooter: 12,
  },
  post: {
    id: '12345',
    posterUrl: 'https://example.com/image.png'
  },
  styles: {
    container: {
      backgroundImage:  'image',
      backgroundColor: 'black'
    },
    shareContent: {
      backgroundColor: 'red',
      color: 'black'
    }
  }
};

describe("ShareContainer component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ShareContainer {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a set className', () => {
    expect(wrapper.prop('className')).toBe('ShareContainer');
  });

  // it('should have h2 tag with theme pageHeaderText', () => {
  //   expect(wrapper.find('div.share-content h2.header-text').text()).toBe(mockProps.theme.pageHeaderText);
  // });

  // it('should have theme pagePrimaryText', () => {
  //   expect(wrapper.find('div.share-content .primary-text').text()).toBe('<AppSanitizeHTML />');
  // });

  // it('should have theme pageDisclaimerText', () => {
  //   expect(wrapper.find('div.share-content .disclaimer-text').text()).toBe('<AppSanitizeHTML />');
  // });

  // AppLogo now conditional with optional url in theme cms
  // it('should have AppLogo component with BrandLogo1 className', () => {
  //   expect(wrapper.find(AppLogo).prop('className')).toBe('BrandLogo1 logo-responsive');
  // });

  it('should have PostImage component', () => {
    expect(wrapper.find(PostImage)).toBeDefined();
  });

  it('should have AppFooter component', () => {
    expect(wrapper.find(AppFooter)).toBeDefined();
  });
});
