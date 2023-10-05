import React from "react";
import { shallow } from 'enzyme';
import { AppLogo } from '../../../atoms/App';

const mockProps = {
  size: 'md',
  src: 'fakesrc.com',
  className: 'test-app-logo'
};

describe("AppLogo component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AppLogo {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should create a className from props', () => {
    expect(wrapper.prop('className')).toBe('logo-md test-app-logo');
  });

  it('should have a valid src', () => {
    expect(wrapper.prop('src')).toBe('fakesrc.com');
  });

  it('should have the alt attribute present', () => {
    expect(wrapper.prop('alt')).toBe('logo');
  });
});
