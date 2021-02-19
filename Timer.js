import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: 5,
    };
    this.isFirstTime = true;
  }

  resetRemainingTime = (remaining = 5) => {
    this.setState({ remaining });
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.remaining > 0) {
        this.isFirstTime = true;
        this.setState({ remaining: this.state.remaining - 1 });
      } else {
        if (this.isFirstTime) {
          this.isFirstTime = false;
          this.props.onTimeout();
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.content,
            { width: ((5 - this.state.remaining) / 5) * (width - 10) },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: width - 10,
    backgroundColor: '#e5e5e5',
    alignSelf: 'center',
  },
  content: {
    height: 10,
    backgroundColor: 'red',
  },
});
