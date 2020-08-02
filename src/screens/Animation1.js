import React from 'react';
import {View, Text, StyleSheet, Animated, PanResponder} from 'react-native';

const Animation1 = () => {
  const position = new Animated.ValueXY({x: 0, y: 0});

  //  -------------------  pan  -------------------

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    // onPanResponderMove: Animated.event([
    //   null,
    //   {dx: position.x, dy: position.y},
    // ]),
    onPanResponderMove: (e, gesture) => {
      position.setValue({x: gesture.dx, y: gesture.dy});
    },
    onPanResponderRelease: () => {
      //   position.setValue({x: 0, y: 0});
      Animated.spring(position, {
        toValue: {x: 0, y: 0},
        bounciness: 20,
        speed: 1,
        useNativeDriver: true,
      }).start();
    },
  });

  //  -------------------  rotate  -------------------

  const rotate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  //  -------------------  spring  -------------------

  //   Animated.spring(position, {
  //     toValue: {x: 200, y: 500},
  //     bounciness: 20,
  //     speed: 1,
  //     useNativeDriver: true,
  //   }).start();

  // -------------------  timing  -------------------

  Animated.timing(position, {
    // toValue: {x: 200, y: 500},
    //   duration: 2000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Animated.View
        {...pan.panHandlers}
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: position.x,
                translateY: position.y,
              },
              {
                rotate: rotate,
              },
            ],
          },
        ]}>
        <Text> Animation1 </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default Animation1;
