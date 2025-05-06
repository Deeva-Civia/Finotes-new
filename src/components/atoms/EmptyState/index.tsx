import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyState = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default EmptyState;
