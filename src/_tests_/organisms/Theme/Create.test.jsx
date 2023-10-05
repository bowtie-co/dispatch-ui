import React from "react";
import { shallow } from 'enzyme';
import { ThemeCreate } from '../../../organisms';
import { Input } from 'reactstrap';

const mockProps = {
  theme: {
    pageHeaderText: 'header text',
    pagePrimaryText: 'primary text',
    pageFooterText: 'footer text',
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
  }
};

describe("ThemeCreate component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ThemeCreate {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a set className', () => {
    expect(wrapper.prop('className')).toBe('ThemeCreate');
  });

  it('should have input with id projectName', () => {
    expect(wrapper.find(Input).prop('id')).toBe('projectName');
  });
});
