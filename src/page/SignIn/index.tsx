import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, TextInput} from '../../components/molecules';
import {Button, Gap} from '../../components/atoms/';
import {auth} from '../../config/Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate('Home', {uid: user.uid});
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      });
  };
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
          label="Email Address"
          placeholder="Enter your Email"
          onChangeText={e => setEmail(e)}
        />
        <Gap height={14} />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={e => setPassword(e)}
        />
        <Gap height={25} />
        <View style={styles.buttonWrapper}>
          <Button
            label="Sign In"
            bgColor="#10266F"
            color="#FFFFFF"
            borderColor="#10266F"
            onPress={onSubmit}
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
