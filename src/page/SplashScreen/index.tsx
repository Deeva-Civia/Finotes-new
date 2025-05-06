import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Gap} from '../../components/atoms';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('Start'), 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.image} />
      <Gap height={24} />
      <Text style={styles.title}>FiNotes</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Angkor-Regular',
    color: '#10266F',
    fontSize: 50,
  },
  image: {
    width: 250,
    height: 250,
  },
});
