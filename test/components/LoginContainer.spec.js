import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import React from 'react';
import LoginContainer from 'components/LoginContainer.jsx';
import { httpInterceptor } from 'utils/httpInterceptor';
import sinon from 'sinon';

chai.use(chaiEnzyme());

describe('LoginContainer Component', () => {
  beforeEach(() => {
    window.localStorage = {
      getItem: (key) => window.localStorage[key],
      setItem: (key, value) => {
        window.localStorage[key] = value;
      },
    };
  });

  const context = { router: { push: sinon.spy() } };

  it('should render LoginContainer details', () => {
    const wrapper = mount(<LoginContainer />, { context });
    expect(wrapper).to.have.descendants('div');
    expect(wrapper).to.have.descendants('Spinner');
    expect(wrapper).to.have.descendants('LoginForm');
    expect(wrapper).to.have.descendants('Error');

    expect(wrapper.state().token).to.equal(undefined);
    expect(wrapper.state().loading).to.equal(false);
    expect(wrapper.state().error).to.equal(undefined);
  });


  it('should post login details', (done) => {
    const token = 'someToken';
    sinon.stub(httpInterceptor, 'post').callsFake(() => Promise.resolve({ token }));
    const wrapper = mount(<LoginContainer />, { context });

    const instance = wrapper.instance();
    instance.login('email', 'password');

    setTimeout(() => {
      expect(wrapper.state().token).to.eql(token);
      expect(wrapper.state().loading).to.equal(false);
      expect(wrapper.state().error).to.equal(undefined);
      httpInterceptor.post.restore();
      sinon.assert.calledWith(context.router.push, '/');
      done();
    }, 500);
  });


  it('should throw error', (done) => {
    const error = {
      response: {
        status: 400,
        statusText: 'Bad Request',
      },
    };
    sinon.stub(httpInterceptor, 'post').callsFake(() => Promise.reject(error));
    const wrapper = mount(<LoginContainer />, { context });

    const instance = wrapper.instance();
    instance.login('email', 'password');

    setTimeout(() => {
      expect(wrapper.state().token).to.eql(undefined);
      expect(wrapper.state().loading).to.equal(false);
      expect(wrapper.state().error).to.eql({ message: 'Invalid Credentials' });
      httpInterceptor.post.restore();
      done();
    }, 500);
  });

  it('should redirect if already authenticated', () => {
    localStorage.setItem('token', 'some Token');
    mount(<LoginContainer />, { context });
    sinon.assert.calledWith(context.router.push, '/');
  });
});
