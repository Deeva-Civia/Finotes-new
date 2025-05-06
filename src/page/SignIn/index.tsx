import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Header, TextInput} from '../../components/molecules';
import {Button, Gap} from '../../components/atoms/';

const SignIn = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
      <Header
        title="Sign In"
        titleSize={26}
        displayBackButton
        align="right"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{'Sign In To Your\nAccount'}</Text>
        <Gap height={100} />
        <TextInput
          label="Username / Email Address"
          placeholder="Enter your username"
        />
        <Gap height={14} />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
        />
        <Gap height={25} />
        <View style={styles.buttonWrapper}>
          <Button
            label="Sign In"
            bgColor="#10266F"
            color="#FFFFFF"
            borderColor="#10266F"
            onPress={() => navigation.navigate('Home')}
          />
          <Gap height={15} />
          <Button
            label="Create new account"
            bgColor="#FFFFFF"
            color="#10266F"
            borderColor="#10266F"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#EDF3FF',
  },
  contentContainer: {
    backgroundColor: '#EDF3FF',
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 55,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Roboto-Bold',
    color: '#10266F',
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 5,
  },
});
