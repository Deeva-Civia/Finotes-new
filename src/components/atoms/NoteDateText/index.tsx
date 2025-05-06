import React from 'react';
import {Text, StyleSheet} from 'react-native';

const NoteDateText = ({date = '18 April 2025 18:16'}) => (
  <Text style={styles.date}>{date}</Text>
);

const styles = StyleSheet.create({
  date: {
    fontSize: 10,
    fontFamily: 'Roboto-Medium',
    color: '#656565',
    marginTop: 6,
    marginBottom: 16,
  },
});

export default NoteDateText;
