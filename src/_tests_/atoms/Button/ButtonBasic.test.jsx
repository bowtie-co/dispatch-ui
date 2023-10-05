import React from "react";
import { shallow } from 'enzyme';
import { ButtonBasic } from '../../../atoms/Button';

const mockProps = {
  className: 'basic-button',
  children: 'test description'
};

describe("ButtonBasic component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ButtonBasic {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should create a className from props', () => {
    expect(wrapper.prop('className')).toBe('ButtonBasic basic-button');
  });
});
