import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import React from 'react';
import LoginForm from 'components/LoginForm.jsx';
import sinon from 'sinon';

chai.use(chaiEnzyme());

describe('LoginForm Component', () => {
  const loginSpy = sinon.spy();

  it('should render login form', () => {
    const wrapper = mount(
      <LoginForm login={loginSpy} />
    );
    expect(wrapper).to.have.descendants('form');
    expect(wrapper.find('input').at(0).props().placeholder).to.eql('email');
    expect(wrapper.find('input').at(1).props().placeholder).to.eql('password');
    expect(wrapper.find('button').text()).to.eql('Login');
  });

  it('should enter email, password and submit', () => {
    const wrapper = mount(
      <LoginForm login={loginSpy} />
    );
    wrapper.find('input').at(0).simulate('change', { target: { value: 'abc@def.com' } });
    wrapper.find('input').at(1).simulate('change', { target: { value: 'pass' } });
    const instance = wrapper.instance();
    instance.handleSubmit({ preventDefault: () => {} });
    sinon.assert.calledWith(loginSpy, 'abc@def.com', 'pass');
  });
});
