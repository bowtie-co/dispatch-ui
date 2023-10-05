import React from "react";
import { shallow } from 'enzyme';
import { AppNavbar } from '../../../organisms/App';
import {
  Nav,
  NavItem,
} from 'reactstrap';

const mockProps = {
  languages: ["en", "es"]
};

describe("AppNavbar component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AppNavbar {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a set className', () => {
    expect(wrapper.prop('className')).toBe('AppNavbar top-nav-section');
  });

  it('should have Nav component with set className', () => {
    expect(wrapper.find(Nav).prop('className')).toBe('ml-auto');
  });

  it('should have two NavItems present in Navbar', () => {
    expect(wrapper.find(NavItem).length).toEqual(2);
  });
});
