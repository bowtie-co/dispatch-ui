import React from "react";
import { shallow } from 'enzyme';
import { BowtieLoader } from '../../../atoms/BowtieLoader';

describe("BowtieLoader component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <BowtieLoader />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should create a className from props', () => {
    expect(wrapper.prop('className')).toBe('loader');
  });

  it('should have a source equal to the loading.svg', () => {
    expect(wrapper.find('img').prop('src')).toBe('bowtie-loader.gif');
  });
});
