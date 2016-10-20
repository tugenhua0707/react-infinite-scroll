
import React from 'react';

class InlineLoading extends React.Component {
  render() {
    return (
      <div className="inline-loading">
        {(() => {
          if (this.props.hasMore === true) {
            return (
              <div className="kebab-spinner-fading-circle circle-color">
                <div className="is-circle1 circle"></div>
                <div className="is-circle2 circle"></div>
                <div className="is-circle3 circle"></div>
                <div className="is-circle4 circle"></div>
                <div className="is-circle5 circle"></div>
                <div className="is-circle6 circle"></div>
                <div className="is-circle7 circle"></div>
                <div className="is-circle8 circle"></div>
                <div className="is-circle9 circle"></div>
                <div className="is-circle10 circle"></div>
                <div className="is-circle11 circle"></div>
                <div className="is-circle12 circle"></div>
              </div>
            )
          }
        })()}
        <span className="text" onClick={this.props.retry}>
          {this.props.text}
        </span>
      </div>
    )
  }
}

InlineLoading.defaultProps = {
  hasMore: true,
  text: '加载中...'
};

InlineLoading.propType = {
  hasMore: React.PropTypes.bool,
  retry: React.PropTypes.func,
  text: React.PropTypes.string
};
export default InlineLoading;

