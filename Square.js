import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

export default class Square extends Component {
  render() {
    const { color, size } = this.props;
    return (
      <View
        style={{
          backgroundColor: color,
          width: size - 6,
          height: size - 6,
          margin: 3,
        }}
      />
    );
  }
}

Square.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Square.defaultProps = {
  color: 'red',
  size: 50,
};
