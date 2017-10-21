import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import React from 'react';
import AudioListContainer from 'components/AudioListContainer.jsx';
import { httpInterceptor } from 'utils/httpInterceptor';
import sinon from 'sinon';

chai.use(chaiEnzyme());

describe('AudioListContainer Component', () => {
  beforeEach(() => {
    window.localStorage = {
      getItem: (key) => window.localStorage[key],
      setItem: (key, value) => {
        window.localStorage[key] = value;
      },
      removeItem: (key) => {
        delete window.localStorage[key];
      },
      token: 'someToken',
    };
  });

  const context = { router: { push: sinon.spy() } };

  const metadata = [
    {
      final_script: 'some text - 1',
      rating: 2,
      duration: 62,
      url: 'someUrl - 1',
      created: '2017-02-21T09:58:35.870732Z',
    },
  ];

  it('should render AudioListContainer details', (done) => {
    sinon.stub(httpInterceptor, 'get').callsFake(() => Promise.resolve({ results: metadata }));
    const wrapper = mount(<AudioListContainer />, { context });
    expect(wrapper.state().loading).to.equal(true);

    setTimeout(() => {
      expect(wrapper).to.have.descendants('div');
      expect(wrapper).to.have.descendants('Spinner');
      expect(wrapper).to.have.descendants('AudioList');
      expect(wrapper.find('input').props().value).to.eql('Logout');
      expect(wrapper.state().loading).to.equal(false);
      expect(wrapper.state().audioMetadataList).to.equal(metadata);
      httpInterceptor.get.restore();
      done();
    }, 500);
  });

  it('should redirect to login page if user is not authenticated', (done) => {
    sinon.stub(httpInterceptor, 'get').callsFake(() => Promise.reject({}));
    const wrapper = mount(<AudioListContainer />, { context });

    setTimeout(() => {
      expect(wrapper.state().loading).to.equal(false);
      expect(wrapper.state().audioMetadataList.length).to.equal(0);
      sinon.assert.calledWith(context.router.push, '/login');
      httpInterceptor.get.restore();
      done();
    }, 500);
  });

  it('should logout and redirect to login page', () => {
    sinon.stub(httpInterceptor, 'get').callsFake(() => Promise.resolve({ results: metadata }));
    const wrapper = mount(<AudioListContainer />, { context });
    const instance = wrapper.instance();
    instance.logout();
    expect(localStorage.getItem('token')).to.eql(undefined);
    sinon.assert.calledWith(context.router.push, '/login');
    httpInterceptor.get.restore();
  });
});
