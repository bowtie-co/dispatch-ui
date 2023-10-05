import React from "react";
import { shallow } from 'enzyme';
import { AppButton } from '../../../atoms/App';

const mockProps = {
  className: 'submit-button',
  children: 'test description'
};

describe("AppButton component", () => {
  let wrapper;
  let appButton;
  const saveChanges = jest.fn(() => 'saveChanges');

  beforeAll(() => {
    wrapper = shallow(
      <AppButton onClick={saveChanges} {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should create a className from props', () => {
    expect(wrapper.prop('className')).toBe('AppButton submit-button');
  });
});
