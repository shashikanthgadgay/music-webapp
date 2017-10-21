import React, { Component } from 'react';
import LoginForm from 'components/LoginForm.jsx';
import { URL } from '../constants';
import { httpInterceptor } from 'utils/httpInterceptor';
import Error from 'components/Error.jsx';
import Spinner from 'components/Spinner.jsx';

export default class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { token: localStorage.getItem('token'), error: undefined, loading: false };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if (this.state.token) {
      this.context.router.push('/');
    }
  }

  login(email, password) {
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    httpInterceptor.post(URL.loginUrl, formData)
      .then((data) => {
        const token = data && data.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        this.setState({ token, error: undefined, loading: false });
        this.context.router.push('/');
      })
      .catch(() => {
        const error = { message: 'Invalid Credentials' };
        this.setState({ token: undefined, error, loading: false });
      });
  }


  render() {
    return (<div>
        <Spinner show={this.state.loading} />
        <LoginForm login={this.login} />
        <Error error={this.state.error} />
      </div>
    );
  }

}

LoginContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

