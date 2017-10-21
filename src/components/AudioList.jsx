import React, { PureComponent, PropTypes } from 'react';

export default class AudioList extends PureComponent {

  getDurationInMinutes(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const totalMinutes = (minutes > 0) ? `${minutes} minutes` : '';
    const totalSeconds = (seconds > 0) ? `${seconds} seconds` : '';
    return `${totalMinutes} ${totalSeconds}`;
  }

  getRows() {
    const { audioMetadataList } = this.props;
    return audioMetadataList.map((audioItem, index) =>
      (<tbody key={index}>
        <tr>
          <th>final_script</th>
          <td>{audioItem.final_script}</td>
        </tr>
        <tr>
          <th>rating</th>
          <td>
            <div className="star-ratings-sprite">
                <span
                  className="star-ratings-sprite-rating"
                  style={{width: audioItem.rating * 20 + '%'}} // eslint-disable-line
                />
            </div>
          </td>
        </tr>
        <tr>
          <th>duration</th>
          <td>{ this.getDurationInMinutes(audioItem.duration) }</td>
        </tr>
        <tr>
          <th>url</th>
          <td>
            <audio controls>
              <source src={audioItem.url} type="audio/ogg" />
            </audio>
          </td>
        </tr>
        <tr>
          <th>created</th>
          <td>{new Date(audioItem.created).toGMTString()}</td>
        </tr>
        </tbody>
      ));
  }

  render() {
    if (this.props.audioMetadataList.length > 0) {
      return (
        <div className="details-wrapper">
          <table>
            {this.getRows()}
          </table>
        </div>
      );
    }
    return null;
  }

}

AudioList.propTypes = {
  audioMetadataList: PropTypes.array.isRequired,
};
