import React from "react";
import { shallow } from 'enzyme';
import { AppFooter } from '../../../organisms/App';

const mockProps = {
  brandCopy: jest.fn(() => 'brandCopy'),
  getThemeUploadUrl: (file) => `//upload.example.com/${file}`,
  theme: {
    pageFooterText: 'footer text',
    bgImage: 'image',
    headerImage: 'header',
    brandColor1: 'black',
    brandColor2: 'red',
    textColor1: 'black',
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    fontSizeFooter: 10,
    brandLogoWidth: 300,
    textColor1: 'black'
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

describe("AppFooter component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AppFooter {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a set className', () => {
    expect(wrapper.prop('className')).toBe('AppFooter');
  });
});
