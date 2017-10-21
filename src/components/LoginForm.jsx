import React, { Component, PropTypes } from 'react';

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    this.props.login(email, password);
    event.preventDefault();
  }

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              id="email"
              onChange={this.onChangeEmail}
              placeholder="email"
              required
              type="email"
            />
            <input
              id="password"
              onChange={this.onChangePassword}
              placeholder="password"
              required
              type="password"
            />
            <button id="submit" type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
