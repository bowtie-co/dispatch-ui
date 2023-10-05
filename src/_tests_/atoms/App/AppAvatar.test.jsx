import React from "react";
import { shallow } from 'enzyme';
import { AppAvatar } from '../../../atoms/App';

const mockProps = {
  owner: {name: 'Michael Scott', avatar_url: 'fakeimageurl.com'}
};

describe("AppAvatar component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AppAvatar {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should create a className from props', () => {
    expect(wrapper.prop('className')).toBe('avatar');
  });

  it('should have a valid src', () => {
    expect(wrapper.prop('src')).toBe('fakeimageurl.com');
  });

  it('should have the alt attribute present', () => {
    expect(wrapper.prop('alt')).toBe('Michael Scott');
  });
});
