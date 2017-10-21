import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import React from 'react';
import AudioList from 'components/AudioList.jsx';

chai.use(chaiEnzyme());

describe('AudioList Component', () => {
  it('should render blank if there is no metadata', () => {
    const wrapper = mount(
      <AudioList audioMetadataList={[]} />
    );
    expect(wrapper).to.be.blank();
  });

  it('should render audio metadata', () => {
    const metadata = [
      {
        final_script: 'some text - 1',
        rating: 2,
        duration: 62,
        url: 'someUrl - 1',
        created: '2017-02-21T09:58:35.870732Z',
      },
      {
        final_script: 'some text - 2',
        rating: 5,
        duration: 10,
        url: 'someUrl - 2 ',
        created: '2017-02-25T09:58:35.870732Z',
      },
    ];

    const wrapper = mount(
      <AudioList audioMetadataList={metadata} />
    );
    expect(wrapper).to.have.descendants('table');

    expect(wrapper.find('th').at(0).text()).to.eql('final_script');
    expect(wrapper.find('th').at(1).text()).to.eql('rating');
    expect(wrapper.find('th').at(2).text()).to.eql('duration');
    expect(wrapper.find('th').at(3).text()).to.eql('url');
    expect(wrapper.find('th').at(4).text()).to.eql('created');

    expect(wrapper.find('td').at(0).text()).to.eql('some text - 1');
    expect(wrapper.find('span').at(0).props().style).to.eql({ width: '40%' });
    expect(wrapper.find('td').at(2).text()).to.eql('1 minutes 2 seconds');
    expect(wrapper.find('td').at(4).text()).to.eql('Tue, 21 Feb 2017 09:58:35 GMT');

    expect(wrapper.find('td').at(5).text()).to.eql('some text - 2');
    expect(wrapper.find('span').at(1).props().style).to.eql({ width: '100%' });
    expect(wrapper.find('td').at(7).text()).to.eql(' 10 seconds');
    expect(wrapper.find('td').at(9).text()).to.eql('Sat, 25 Feb 2017 09:58:35 GMT');
  });
});
