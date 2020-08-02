import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card} from 'react-native-paper';

const WIDTH = Dimensions.get('screen').width;
const SWIPE_THRESHOULD = WIDTH / 2;

const Animation2 = () => {
  const data = [
    {
      id: 1,
      uri:
        'https://images.unsplash.com/photo-1573331519317-30b24326bb9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    },
    {
      id: 2,
      uri:
        'https://images.unsplash.com/photo-1573331519317-30b24326bb9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    },
    {
      id: 3,
      uri:
        'https://images.unsplash.com/photo-1573331519317-30b24326bb9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    },
    {
      id: 4,
      uri:
        'https://images.unsplash.com/photo-1573331519317-30b24326bb9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    },
  ];
  const [counter, setCounter] = useState(0);
  const position = new Animated.ValueXY({x: 0, y: 0});
  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    // onPanResponderMove: (e, gesture) => {
    //   position.setValue({x: gesture.dx});
    // },
    onPanResponderMove: Animated.event([null, {dx: position.x}]),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx > SWIPE_THRESHOULD) {
        swiped('right');
      } else if (gesture.dx < -SWIPE_THRESHOULD) {
        swiped('left');
      }
    },
  });

  const swiped = (direction) => {
    const x = direction === 'right' ? WIDTH + 10 : -WIDTH - 10;
    Animated.spring(position, {
      toValue: {x: x, y: 0},
      useNativeDriver: true,
    }).start(() => {
      LayoutAnimation.spring();
      position.setValue({x: 0, y: 0});
      setCounter((prevState) => {
        return prevState + 1;
      });
    });
  };
  const rotate = position.x.interpolate({
    inputRange: [-WIDTH, 0, WIDTH],
    outputRange: ['-45deg', '0deg', '45deg'],
  });

  const cardView = ({item, index}) => {
    if (index < counter) {
      return null;
    } else if (index === counter) {
      return (
        <Animated.View
          {...pan.panHandlers}
          style={{transform: [{translateX: position.x}, {rotate: rotate}]}}>
          <Card>
            <Card.Cover source={{uri: item.uri}} />
            <Card.Actions>
              <AntDesign name={'hearto'} size={30} color="red" />
            </Card.Actions>
          </Card>
        </Animated.View>
      );
    }
    return (
      <Animated.View>
        <Card>
          <Card.Cover source={{uri: item.uri}} />
          <Card.Actions>
            <AntDesign name={'hearto'} size={30} color="red" />
          </Card.Actions>
        </Card>
      </Animated.View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={cardView}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 70,
    left: '45%',
    elevation: 4,
    zIndex: 3,
  },
});

export default Animation2;
