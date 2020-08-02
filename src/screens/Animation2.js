import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Animated} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card} from 'react-native-paper';

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

  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [counter, setCounter] = useState(-2);
  const currentValue = new Animated.Value(1);
  const AnimationIcon = Animated.createAnimatedComponent(AntDesign);
  useEffect(() => {
    if (liked === true) {
      Animated.spring(currentValue, {
        toValue: 2,
        friction: 2,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(currentValue, {
          toValue: 1,
          friction: 2,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
        });
      });
    }
  }, [liked]);
  return (
    <View>
      {visible && (
        <AnimationIcon
          name="heart"
          size={50}
          color="red"
          style={[styles.icon, {transform: [{scale: currentValue}]}]}
        />
      )}
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <Card>
              <Card.Cover source={{uri: item.uri}} />
              <Card.Actions>
                <AntDesign
                  name={liked && index === counter ? 'heart' : 'hearto'}
                  size={30}
                  color="red"
                  onPress={() => {
                    if (liked === false) {
                      setVisible(true);
                    }
                    setLiked(!liked);
                    setCounter(index);
                  }}
                />
              </Card.Actions>
            </Card>
          );
        }}
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
