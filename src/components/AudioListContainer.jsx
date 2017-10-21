import React, { Component } from 'react';
import { URL } from '../constants';
import { httpInterceptor } from 'utils/httpInterceptor';
import Spinner from 'components/Spinner.jsx';
import AudioList from 'components/AudioList.jsx';

export default class AudioListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      audioMetadataList: [],
      loading: true,
      isAuthenticated: 'true',
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    httpInterceptor.get(URL.audioMetadataUrl, token)
      .then((data) => {
        const audioMetadataList = data && data.results;
        this.setState({ audioMetadataList, loading: false });
      })
      .catch(() => {
        this.setState({ isAuthenticated: false, loading: false });
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.context.router.push('/login');
  }

  renderLogout() {
    if (this.state.audioMetadataList.length > 0) {
      return (<input className="logout" onClick={this.logout} type="button" value="Logout" />);
    }
    return null;
  }

  render() {
    if (!this.state.isAuthenticated) {
      this.context.router.push('/login');
      return null;
    }
    return (
      <div>
        <Spinner show={this.state.loading} />
        {this.renderLogout()}
        <AudioList audioMetadataList={this.state.audioMetadataList} />
      </div>
    );
  }

}

AudioListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

