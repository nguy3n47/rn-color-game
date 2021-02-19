import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

import Square from './Square';
import Timer from './Timer';

const { width } = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSquare: 25,
      score: 0,
    };
    this.redCounter = 0;
    this.blueCounter = 0;
  }

  onAnswer = (chosen) => () => {
    this.Timer.resetRemainingTime();
    if (
      (chosen === 0 && this.redCounter > this.blueCounter) ||
      (chosen === 1 && this.redCounter < this.blueCounter)
    ) {
      this.setState({ score: this.state.score + 1 });
    } else {
      this.setState({ score: 0 });
    }

    this.redCounter = 0;
    this.blueCounter = 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boardContainer}>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            {Array.apply(null, Array(this.state.totalSquare)).map(
              (e, index) => {
                let isRed = 0;
                if (this.redCounter < 12 && this.blueCounter < 12) {
                  isRed = Math.floor(Math.random() * 10) % 2;
                  this.redCounter += isRed;
                  this.blueCounter += 1 - isRed;
                } else if (this.blueCounter === 12 && this.redCounter < 12) {
                  isRed = 1;
                  this.redCounter += 1;
                } else if (this.redCounter === 12 && this.blueCounter < 12) {
                  isRed = 0;
                  this.blueCounter += 1;
                } else {
                  isRed = Math.floor(Math.random() * 10) % 2;
                  this.redCounter += isRed;
                  this.blueCounter += 1 - isRed;
                }

                return (
                  <Square
                    key={index}
                    color={isRed ? 'red' : 'blue'}
                    size={width / 5}
                  />
                );
              },
            )}
          </View>
        </View>
        <Timer
          ref={(ref) => {
            this.Timer = ref;
          }}
          onTimeout={() => {
            this.redCounter = 0;
            this.blueCounter = 0;
            this.setState({ score: 0 });
          }}
        />
        <View style={styles.answerContainer}>
          <TouchableOpacity
            style={[styles.answerButtonContainer, { backgroundColor: 'red' }]}
            onPress={this.onAnswer(0)}
          />
          <Text style={styles.scoreText}>{this.state.score}</Text>
          <TouchableOpacity
            style={[styles.answerButtonContainer, { backgroundColor: 'blue' }]}
            onPress={this.onAnswer(1)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  boardContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  answerButtonContainer: {
    width: 100,
    height: 100,
  },
  scoreText: {
    fontSize: 40,
  },
});
