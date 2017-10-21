import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import React from 'react';
import Error from 'components/Error.jsx';

chai.use(chaiEnzyme());

describe('Error Component', () => {
  it('should render error', () => {
    const error = { message: 'some message' };
    const wrapper = mount(
      <Error error={error} />
    );
    expect(wrapper).to.have.descendants('div');
    expect(wrapper.find('span').text()).to.eql('some message');
  });


  it('should not render error', () => {
    const error = undefined;
    const wrapper = mount(
      <Error error={error} />
    );
    expect(wrapper).to.be.blank();
  });
});
