import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import React from 'react';
import MusicContainer from 'components/MusicContainer.jsx';

chai.use(chaiEnzyme());

describe('MusicContainer Component', () => {
  it('should render MusicContainer', () => {
    const wrapper = mount(
      <MusicContainer />
    );
    expect(wrapper).to.have.descendants('span');
    expect(wrapper.find('span')).text().to.eql('Hello World!!!');
  });
});
